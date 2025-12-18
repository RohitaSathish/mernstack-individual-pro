import api from './api.js';

const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData);
  },

  // Get user orders
  getUserOrders: async (userId) => {
    return await api.get(`/orders/user/${userId}`);
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    return await api.get(`/orders/${orderId}`);
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    return await api.put(`/orders/${orderId}/status`, { status });
  }
};

export default orderService;