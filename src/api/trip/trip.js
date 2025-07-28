import axiosInstance from '@/api/config/axios';

export const tripsApi = {
  getAllTrips: async (params) => {
    const response = await axiosInstance.get('/trips', { params });
    return response.data;
  },

  getTripById: async (id) => {
    const response = await axiosInstance.get(`/trips/${id}`);
    return response.data;
  },

  createTrip: async (data) => {
    const response = await axiosInstance.post('/trips', data);
    return response.data;
  },

  updateTrip: async (id, data) => {
    const response = await axiosInstance.put(`/trips/${id}`, data);
    return response.data;
  },

  deleteTrip: async (id) => {
    const response = await axiosInstance.delete(`/trips/${id}`);
    return response.data;
  },

  hardDeleteTrip: async (id) => {
    const response = await axiosInstance.delete(`/trips/${id}/hard`);
    return response.data;
  },

  deleteAllTrips: async () => {
    const response = await axiosInstance.delete('/trips');
    return response.data;
  },

  restoreTrip: async (id) => {
    const response = await axiosInstance.put(`/trips/${id}/restore`);
    return response.data;
  },

  // Gửi trip lên sample (user)
  sendToSample: async (id) => {
    const response = await axiosInstance.patch(`/trips/${id}/sendToSample`);
    return response.data;
  },

  // Admin duyệt trip
  approveSample: async (id, data) => {
    const response = await axiosInstance.patch(`/trips/${id}/approveSample`, data);
    return response.data;
  },

  // Admin từ chối trip
  denySample: async (id, data) => {
    const response = await axiosInstance.patch(`/trips/${id}/denySample`, data);
    return response.data;
  },
};
