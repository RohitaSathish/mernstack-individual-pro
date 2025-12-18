import api from './api.js';

const medicineService = {
  // Get all medicines
  getAllMedicines: async () => {
    return await api.get('/medicines');
  },

  // Get medicines by category
  getMedicinesByCategory: async (category) => {
    return await api.get(`/medicines/category/${encodeURIComponent(category)}`);
  },

  // Get medicine by ID
  getMedicineById: async (id) => {
    return await api.get(`/medicines/${id}`);
  },

  // Search medicines by name
  searchMedicines: async (searchTerm) => {
    const medicines = await api.get('/medicines');
    return medicines.filter(medicine => 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.purpose.toLowerCase().includes(searchTerm.toLowerCase())
    );
  },

  // Get available categories
  getCategories: async () => {
    const medicines = await api.get('/medicines');
    const categories = [...new Set(medicines.map(medicine => medicine.category))];
    return categories;
  }
};

export default medicineService;