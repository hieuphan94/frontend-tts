'use client';

/**
 * WebSocket service singleton
 * Quản lý kết nối WebSocket độc lập với React lifecycle
 */

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3009';
const WS_TOKEN = process.env.NEXT_PUBLIC_WEB_SOCKET_TOKEN;
const WS_RECONNECT_INTERVAL = 5000; // 5 seconds
const PING_INTERVAL = 25000; // 25 seconds (server interval is 30s)

class WebSocketService {
  constructor() {
    this.connection = null;
    this.connected = false;
    this.reconnectTimeout = null;
    this.pingInterval = null;
    this.messageHandlers = new Set();
    this.subscriptions = new Set();
    this.heartbeatMissed = 0;
    this.reconnectCount = 0;
    
    // Đăng ký clean up khi unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.cleanUp());
    }
  }

  // Kết nối đến WebSocket server
  connect() {
    if (this.connection && this.connection.readyState === WebSocket.OPEN) {
      return;
    }

    if (this.connection && (this.connection.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      // Dọn dẹp connection cũ nếu có
      if (this.connection) {
        this.connection.onclose = null;
        this.connection.onerror = null;
        this.connection.onmessage = null;
        this.connection.onopen = null;
        try {
          this.connection.close();
        } catch(e) {
          // Ignore
        }
      }
      
      this.connection = new WebSocket(`${WS_URL}?token=${WS_TOKEN}`);

      this.connection.onopen = () => {
        this.connected = true;
        this.heartbeatMissed = 0;
        this.reconnectCount = 0;
        this.startHeartbeat();
        
        // Notify all listeners
        this.notifyStatusChange();
        
        // Resubscribe to all channels
        this.resubscribeAll();
      };

      this.connection.onclose = (event) => {
        this.connected = false;
        
        // Stop heartbeats
        if (this.pingInterval) {
          clearInterval(this.pingInterval);
          this.pingInterval = null;
        }
        
        this.notifyStatusChange();
        
        // Reconnect if not a normal closure or heartbeat timeout
        if (event.code !== 1000 || event.reason === 'Heartbeat timeout') {
          this.scheduleReconnect();
        }
      };

      this.connection.onerror = (error) => {
        console.error('[WS] Connection error:', error);
        this.connected = false;
        this.notifyStatusChange();
      };

      this.connection.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          
          // Handle pong
          if (message.type === 'PONG') {
            this.heartbeatMissed = 0;
            return;
          }
          
          // Broadcast message to all handlers
          this.messageHandlers.forEach(handler => {
            try {
              handler(message);
            } catch (e) {
              console.error('[WS] Error in message handler:', e);
            }
          });
        } catch (error) {
          console.error('[WS] Error parsing message:', error);
        }
      };
    } catch (error) {
      console.error('[WS] Failed to connect:', error);
      this.connected = false;
      this.notifyStatusChange();
      this.scheduleReconnect();
    }
  }

  // Đăng ký lắng nghe thay đổi trạng thái kết nối
  addStatusListener(callback) {
    if (!this.statusListeners) this.statusListeners = new Set();
    this.statusListeners.add(callback);
    
    // Ngay lập tức gọi callback với trạng thái hiện tại
    callback(this.connected);
    
    // Trả về hàm để hủy đăng ký
    return () => {
      if (this.statusListeners) {
        this.statusListeners.delete(callback);
      }
    };
  }

  // Thông báo đến tất cả listeners về thay đổi trạng thái
  notifyStatusChange() {
    if (!this.statusListeners) return;
    this.statusListeners.forEach(listener => {
      try {
        listener(this.connected);
      } catch (e) {
        console.error('[WS] Error in status listener:', e);
      }
    });
  }
  
  // Đăng ký handler cho tin nhắn
  addMessageHandler(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }
  
  // Đăng ký theo dõi một kênh
  subscribe(channel) {
    if (!channel) return;
    
    this.subscriptions.add(channel);
    
    if (this.connected && this.connection?.readyState === WebSocket.OPEN) {
      this.sendMessage({
        type: 'SUBSCRIBE',
        data: { channel }
      });
    }
    
    return () => this.unsubscribe(channel);
  }
  
  // Hủy đăng ký một kênh
  unsubscribe(channel) {
    if (!channel) return;
    
    this.subscriptions.delete(channel);
    
    if (this.connected && this.connection?.readyState === WebSocket.OPEN) {
      this.sendMessage({
        type: 'UNSUBSCRIBE',
        data: { channel }
      });
    }
  }
  
  // Đăng ký lại tất cả kênh sau khi kết nối lại
  resubscribeAll() {
    if (!this.connected || this.subscriptions.size === 0) return;
    
    this.subscriptions.forEach(channel => {
      this.sendMessage({
        type: 'SUBSCRIBE',
        data: { channel }
      });
    });
  }
  
  // Gửi tin nhắn
  sendMessage(message) {
    if (!this.connected || !this.connection || this.connection.readyState !== WebSocket.OPEN) {
      console.warn('[WS] Cannot send message, not connected');
      return false;
    }
    
    try {
      this.connection.send(JSON.stringify(message));
      return true;
    } catch (error) {
      console.error('[WS] Error sending message:', error);
      return false;
    }
  }
  
  // Khởi động heartbeat để kiểm tra kết nối
  startHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    
    this.pingInterval = setInterval(() => {
      if (!this.connected || !this.connection || this.connection.readyState !== WebSocket.OPEN) {
        if (this.pingInterval) {
          clearInterval(this.pingInterval);
          this.pingInterval = null;
        }
        return;
      }
      
      try {
        this.sendMessage({ type: 'PING' });
        this.heartbeatMissed++;
        
        // Nếu không nhận được phản hồi cho 3 ping liên tiếp, đóng kết nối và kết nối lại
        if (this.heartbeatMissed >= 3) {
          this.reconnect('Heartbeat timeout');
        }
      } catch (e) {
        console.error('[WS] Error sending ping:', e);
      }
    }, PING_INTERVAL);
  }
  
  // Lên lịch kết nối lại
  scheduleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    
    const delay = this.reconnectCount > 5 ? 30000 : WS_RECONNECT_INTERVAL;
    
    this.reconnectTimeout = setTimeout(() => {
      this.reconnectCount++;
      this.connect();
    }, delay);
  }
  
  // Kết nối lại
  reconnect(reason = 'Manual reconnect') {
    this.reconnectCount = 0;
    
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.connection) {
      try {
        this.connection.close(1000, reason);
      } catch (e) {
        // Ignore
      }
      this.connection = null;
    }
    
    setTimeout(() => {
      this.connect();
    }, 500);
  }
  
  // Dọn dẹp resources khi unload
  cleanUp() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    if (this.connection) {
      this.connection.onclose = null;
      this.connection.onerror = null;
      this.connection.onmessage = null;
      this.connection.onopen = null;
      
      try {
        this.connection.close(1000, 'Page unloaded');
      } catch (e) {
        // Ignore
      }
      this.connection = null;
    }
    
    this.connected = false;
    this.messageHandlers.clear();
    if (this.statusListeners) this.statusListeners.clear();
  }
}

// Export singleton instance
const wsService = new WebSocketService();
export default wsService;
