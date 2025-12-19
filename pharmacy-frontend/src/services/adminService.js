import api from './api.js';

export const adminService = {
  // Messages
  getMessages: () => api.get('/messages'),
  replyToMessage: (messageId, reply) => api.put(`/messages/${messageId}/reply`, { reply }),

  // Orders
  getOrders: () => api.get('/orders'),

  // Users
  getUsers: () => api.get('/users'),
  getLoginCredentials: () => api.get('/users/login-credentials'),
  getRegistrationCredentials: () => api.get('/users/registration-credentials'),
};