'use client';

import { useState, useEffect, useCallback } from 'react';
import wsService from '../api/config/websocket';

/**
 * React hook để sử dụng WebSocket service trong components
 * @param {Object} options - Tùy chọn
 * @param {string|string[]} options.channel - Kênh hoặc mảng các kênh để subscribe
 * @returns {Object} - WebSocket API
 */
export function useWebSocketClient({ channel } = {}) {
  const [isConnected, setIsConnected] = useState(false);
  
  // Đăng ký nhận thông báo về trạng thái kết nối
  useEffect(() => {
    // Kết nối nếu chưa kết nối
    if (!wsService.connected) {
      wsService.connect();
    }
    
    // Đăng ký lắng nghe sự thay đổi trạng thái
    const unsubscribe = wsService.addStatusListener((status) => {
      setIsConnected(status);
    });
    
    return unsubscribe;
  }, []);
  
  // Đăng ký theo dõi các kênh nếu được chỉ định
  useEffect(() => {
    if (!channel) return;
    
    // Chuyển đổi channel thành mảng nếu là string
    const channels = Array.isArray(channel) ? channel : [channel];
    
    // Đăng ký theo dõi từng kênh
    const unsubscribes = channels.map(ch => wsService.subscribe(ch));
    
    // Cleanup function để unsubscribe tất cả các kênh
    return () => {
      unsubscribes.forEach(unsubscribe => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      });
    };
  }, [channel]);
  
  // Đăng ký handler cho tin nhắn
  const addMessageHandler = useCallback((handler) => {
    return wsService.addMessageHandler(handler);
  }, []);
  
  // Gửi tin nhắn
  const sendMessage = useCallback((message) => {
    return wsService.sendMessage(message);
  }, []);
  
  // Kết nối thủ công
  const connect = useCallback(() => {
    wsService.connect();
  }, []);
  
  // Kết nối lại thủ công
  const reconnect = useCallback(() => {
    wsService.reconnect();
  }, []);
  
  return {
    isConnected,
    addMessageHandler,
    sendMessage,
    connect,
    reconnect
  };
}
