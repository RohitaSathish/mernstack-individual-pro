const API_BASE_URL = 'http://localhost:5000/api';

export const adminService = {
  async getMessages() {
    try {
      const response = await fetch(`${API_BASE_URL}/messages`);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async replyToMessage(messageId, reply) {
    try {
      const response = await fetch(`${API_BASE_URL}/messages/${messageId}/reply`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply })
      });
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.error('Error sending reply:', error);
      throw error;
    }
  }
};