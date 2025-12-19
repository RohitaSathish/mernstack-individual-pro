import React, { createContext, useContext, useState, useEffect } from "react";
// Simple API functions
const API_BASE_URL = 'http://localhost:5000/api';

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  },
};

const MedicineContext = createContext();

export const useMedicines = () => {
  return useContext(MedicineContext);
};

export const MedicineProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load medicines from backend on component mount
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      // Use hardcoded medicine data directly
      console.log('Loading hardcoded medicine data');
      setMedicines([
    // Pain Relief
    { id: 1, name: "Paracetamol", dosage: "650mg", brand: "Dolo", price: 20, rating: 4.5, purpose: "Pain relief and fever reduction", category: "Pain Relief", image: "https://5.imimg.com/data5/SELLER/Default/2023/2/NS/KK/TJ/11196735/dolo-500-1675673410537-1000x1000.jpg", description: "Paracetamol is a widely used over-the-counter pain reliever and fever reducer. It is effective for treating mild to moderate pain and reducing fever.", usage: "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours. Take with or without food.", ingredients: "Paracetamol 650mg, Microcrystalline cellulose, Starch, Magnesium stearate" },
    { id: 4, name: "Ibuprofen", dosage: "400mg", brand: "Brufen", price: 15, rating: 4.3, purpose: "Anti-inflammatory and pain relief", category: "Pain Relief", image: "https://5.imimg.com/data5/SELLER/Default/2024/7/438682358/MA/IB/IW/10526113/brufen-400mg-ibuprofen-tablets-500x500.png", description: "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce inflammation, pain, and fever.", usage: "Take 1 tablet every 6-8 hours with food. Do not exceed 3 tablets in 24 hours.", ingredients: "Ibuprofen 400mg, Lactose, Corn starch, Colloidal silicon dioxide" },
    { id: 5, name: "Aspirin", dosage: "75mg", brand: "Disprin", price: 10, rating: 4.1, purpose: "Pain relief and blood thinning", category: "Pain Relief", image: "https://tse1.mm.bing.net/th/id/OIP.OTuWUEhB5n7jmm6sSMWfrAHaHa?pid=Api&P=0&h=180", description: "Low-dose aspirin used for pain relief and cardiovascular protection through blood thinning properties.", usage: "Take 1 tablet daily with food. For pain relief, take as needed every 4-6 hours.", ingredients: "Aspirin 75mg, Microcrystalline cellulose, Corn starch, Talc" },
    { id: 21, name: "Diclofenac", dosage: "50mg", brand: "Voveran", price: 25, rating: 4.2, purpose: "Anti-inflammatory pain relief", category: "Pain Relief", image: "https://tse1.mm.bing.net/th/id/OIP.uyoh4rxH-Q3H0AhFo4GNLwHaEv?pid=Api&P=0&h=180" },
    { id: 27, name: "Tramadol", dosage: "50mg", brand: "Ultracet", price: 45, rating: 4.3, purpose: "Moderate to severe pain relief", category: "Pain Relief", image: "https://images.apollo247.in/pub/media/catalog/product/u/l/ult0065.jpg" },
    { id: 28, name: "Naproxen", dosage: "250mg", brand: "Naprosyn", price: 30, rating: 4.1, purpose: "Pain and inflammation relief", category: "Pain Relief", image: "https://tse1.mm.bing.net/th/id/OIP.riqP07qom4H3CH9ebepX6QHaHa?pid=Api&P=0&h=180" },


    // Antibiotics
    { id: 6, name: "Amoxicillin", dosage: "500mg", brand: "Novamox", price: 150, rating: 4.6, purpose: "Antibiotic for bacterial infections", category: "Antibiotics", image: "https://tse4.mm.bing.net/th/id/OIP.siM90mMEgHIWbd2j3p23RwHaHa?pid=Api&P=0&h=180" },
    { id: 29, name: "Azithromycin", dosage: "250mg", brand: "Azee", price: 180, rating: 4.5, purpose: "Antibiotic for respiratory infections", category: "Antibiotics", image: "https://5.imimg.com/data5/SELLER/Default/2025/6/517686061/XD/VM/LV/241454209/azee-250-mg-600-tab-azithromycin-1-1000x1000.webp" },
    { id: 30, name: "Ciprofloxacin", dosage: "500mg", brand: "Cipro", price: 120, rating: 4.4, purpose: "Broad-spectrum antibiotic", category: "Antibiotics", image: "https://tse2.mm.bing.net/th/id/OIP.dPGGVzYbWTs_tm5pdmT5VAHaFQ?pid=Api&P=0&h=180" },
    { id: 31, name: "Doxycycline", dosage: "100mg", brand: "Doxy", price: 95, rating: 4.3, purpose: "Treats bacterial infections", category: "Antibiotics", image: "https://www.vinmec.com/static/uploads/20220511_081406_321618_doxycyclin_100mg_max_1800x1800_png_feb29ed0d1.png" },
    { id: 32, name: "Cephalexin", dosage: "500mg", brand: "Keflex", price: 140, rating: 4.5, purpose: "Treats skin and respiratory infections", category: "Antibiotics", image: "https://5.imimg.com/data5/YQ/YO/IQ/SELLER-95289/cephalexin-capsules-500mg-1000x1000.jpg" },


    // Vitamins
    { id: 3, name: "Vitamin C", dosage: "1000mg", brand: "Limcee", price: 120, rating: 4.7, purpose: "Immune system support and antioxidant", category: "Vitamins", image: "https://www.bbassets.com/media/uploads/p/l/40323622_1-limcee-vitamin-c-chewable-tablet-500-mg-orange-flavour.jpg" },
    { id: 33, name: "Vitamin D3", dosage: "60000 IU", brand: "Calcirol", price: 80, rating: 4.6, purpose: "Bone health and calcium absorption", category: "Vitamins", image: "https://5.imimg.com/data5/SELLER/Default/2021/12/OS/WM/PU/40092401/vitamin-d3-cholecalciferol-calcitriol-60000-iu--1000x1000.jpeg" },
    { id: 34, name: "B-Complex", dosage: "1 tablet", brand: "Becosules", price: 90, rating: 4.5, purpose: "Energy metabolism and nerve function", category: "Vitamins", image: "https://5.imimg.com/data5/SELLER/Default/2020/11/SD/PX/YY/20780542/b-capsules-500x500.jpg" },
    { id: 35, name: "Multivitamin", dosage: "1 tablet", brand: "Revital", price: 150, rating: 4.7, purpose: "Complete daily nutrition", category: "Vitamins", image: "http://themedihubpharma.in/wp-content/uploads/2024/05/Revital-H-Men-Multivitamin-Capsules-60-Cap-Pack.png" },
    { id: 36, name: "Omega-3", dosage: "1000mg", brand: "Fish Oil", price: 200, rating: 4.6, purpose: "Heart and brain health", category: "Vitamins", image: "https://tse3.mm.bing.net/th/id/OIP.__YJi1YRXYsv-SIk_DkxGAHaHa?pid=Api&P=0&h=180" },
    { id: 37, name: "Zinc Tablets", dosage: "50mg", brand: "Zincovit", price: 110, rating: 4.4, purpose: "Immune support and wound healing", category: "Vitamins", image: "https://5.imimg.com/data5/SELLER/Default/2024/9/450052741/FP/IO/RV/190713523/zincovit-multimineral-with-grape-seed-extract-tablets-500x500.png" },


    // Chronic Care
    { id: 9, name: "Metformin", dosage: "500mg", brand: "Glucophage", price: 30, rating: 4.3, purpose: "Controls blood sugar in diabetes", category: "Chronic Care", image: "https://tse3.mm.bing.net/th/id/OIP.Tsnt5lF6dug0mrvwwXlu9AHaHG?pid=Api&P=0&h=180" },
    { id: 10, name: "Losartan", dosage: "50mg", brand: "Cozaar", price: 35, rating: 4.2, purpose: "Treats high blood pressure", category: "Chronic Care", image: "https://nhathuocanphuoc.com.vn/upload/product/thuoc-cozaar-50mg-losartan-hop-28-vien-7412.jpg" },
    { id: 38, name: "Atorvastatin", dosage: "20mg", brand: "Lipitor", price: 50, rating: 4.4, purpose: "Lowers cholesterol levels", category: "Chronic Care", image: "https://medihub.pk/wp-content/uploads/2022/10/LIPITOR-TAB-20-MG-10S.webp" },
    { id: 39, name: "Amlodipine", dosage: "5mg", brand: "Norvasc", price: 40, rating: 4.3, purpose: "Treats high blood pressure", category: "Chronic Care", image: "https://www.assetpharmacy.com/wp-content/uploads/2017/09/Norvasc-5mg-Amlodipine-5mg-Tablets-30-Tablets.jpg" },
    { id: 40, name: "Glimepiride", dosage: "2mg", brand: "Amaryl", price: 55, rating: 4.2, purpose: "Controls blood sugar in diabetes", category: "Chronic Care", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/361725384/QK/GG/BS/27213454/amaryl-glimepiride-tablets-2mg-1000x1000.jpg" },

    // Respiratory
    { id: 41, name: "Salbutamol", dosage: "100mcg", brand: "Asthalin", price: 85, rating: 4.5, purpose: "Asthma and breathing problems", category: "Respiratory", image: "https://5.imimg.com/data5/SELLER/Default/2021/8/YE/DH/GH/6498690/asthalin-inhaler-100-mcg-1000x1000.jpg" },
    { id: 42, name: "Montelukast", dosage: "10mg", brand: "Montair", price: 120, rating: 4.4, purpose: "Asthma and allergy prevention", category: "Respiratory", image: "https://5.imimg.com/data5/SELLER/Default/2023/2/288088969/YF/TE/WH/6498690/montair-10-mg-tablet-1000x1000.jpg" },
    { id: 43, name: "Cetirizine", dosage: "10mg", brand: "Zyrtec", price: 45, rating: 4.3, purpose: "Allergy relief", category: "Respiratory", image: "https://5.imimg.com/data5/SELLER/Default/2023/8/338088969/YF/TE/WH/6498690/zyrtec-10-mg-tablet-1000x1000.jpg" },

    // Digestive
    { id: 44, name: "Omeprazole", dosage: "20mg", brand: "Prilosec", price: 65, rating: 4.6, purpose: "Reduces stomach acid", category: "Digestive", image: "https://5.imimg.com/data5/SELLER/Default/2023/5/308088969/YF/TE/WH/6498690/prilosec-20-mg-capsule-1000x1000.jpg" },
    { id: 45, name: "Loperamide", dosage: "2mg", brand: "Imodium", price: 55, rating: 4.2, purpose: "Treats diarrhea", category: "Digestive", image: "https://5.imimg.com/data5/SELLER/Default/2023/7/328088969/YF/TE/WH/6498690/imodium-2-mg-capsule-1000x1000.jpg" },

    // Women's Health
    { id: 46, name: "Iron Tablets", dosage: "65mg", brand: "Feroglobin", price: 95, rating: 4.4, purpose: "Iron deficiency anemia", category: "Women's Health", image: "https://5.imimg.com/data5/SELLER/Default/2023/9/348088969/YF/TE/WH/6498690/feroglobin-65-mg-tablet-1000x1000.jpg" },
    { id: 47, name: "Folic Acid", dosage: "5mg", brand: "Folvite", price: 40, rating: 4.5, purpose: "Pregnancy and anemia support", category: "Women's Health", image: "https://5.imimg.com/data5/SELLER/Default/2023/6/318088969/YF/TE/WH/6498690/folvite-5-mg-tablet-1000x1000.jpg" }
      ]);
    } catch (error) {
      console.error('Error loading medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMedicine = async (medicine) => {
    try {
      console.log('API call: Adding medicine', medicine);
      const newMedicine = await api.post('/medicines', medicine);
      console.log('API response:', newMedicine);
      setMedicines([...medicines, newMedicine]);
      return newMedicine;
    } catch (error) {
      console.error('Error adding medicine:', error);
      console.error('Error details:', error.message);
      throw error;
    }
  };

  const updateMedicine = async (id, updatedMedicine) => {
    try {
      const updated = await api.put(`/medicines/${id}`, updatedMedicine);
      setMedicines(medicines.map(med => med._id === id ? updated : med));
      return updated;
    } catch (error) {
      console.error('Error updating medicine:', error);
      throw error;
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await api.delete(`/medicines/${id}`);
      setMedicines(medicines.filter(med => med._id !== id));
    } catch (error) {
      console.error('Error deleting medicine:', error);
      throw error;
    }
  };

  return (
    <MedicineContext.Provider value={{ medicines, addMedicine, updateMedicine, deleteMedicine, loading, fetchMedicines }}>
      {children}
    </MedicineContext.Provider>
  );
};