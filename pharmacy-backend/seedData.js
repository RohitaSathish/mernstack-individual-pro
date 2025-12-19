const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');
const User = require('./models/User');
const Message = require('./models/Message');
const Order = require('./models/Order');
require('dotenv').config();

const sampleMedicines = [
  // Pain Relief
  { name: "Paracetamol", dosage: "500mg", brand: "Crocin", price: 25, rating: 4.5, purpose: "Fever and pain relief", image: "https://via.placeholder.com/200x150?text=Paracetamol", category: "Pain Relief" },
  { name: "Ibuprofen", dosage: "400mg", brand: "Brufen", price: 35, rating: 4.3, purpose: "Anti-inflammatory pain relief", image: "https://via.placeholder.com/200x150?text=Ibuprofen", category: "Pain Relief" },
  { name: "Diclofenac", dosage: "50mg", brand: "Voveran", price: 45, rating: 4.2, purpose: "Muscle and joint pain", image: "https://via.placeholder.com/200x150?text=Diclofenac", category: "Pain Relief" },
  
  // Antibiotics
  { name: "Amoxicillin", dosage: "250mg", brand: "Novamox", price: 85, rating: 4.2, purpose: "Bacterial infections", image: "https://via.placeholder.com/200x150?text=Amoxicillin", category: "Antibiotics" },
  { name: "Azithromycin", dosage: "500mg", brand: "Azee", price: 120, rating: 4.4, purpose: "Respiratory tract infections", image: "https://via.placeholder.com/200x150?text=Azithromycin", category: "Antibiotics" },
  { name: "Ciprofloxacin", dosage: "500mg", brand: "Ciplox", price: 95, rating: 4.1, purpose: "Urinary tract infections", image: "https://via.placeholder.com/200x150?text=Ciprofloxacin", category: "Antibiotics" },
  
  // Vitamins
  { name: "Vitamin D3", dosage: "60000 IU", brand: "Calcirol", price: 45, rating: 4.7, purpose: "Vitamin D deficiency", image: "https://via.placeholder.com/200x150?text=Vitamin+D3", category: "Vitamins" },
  { name: "Vitamin B12", dosage: "1500mcg", brand: "Neurobion", price: 55, rating: 4.5, purpose: "Nerve health and energy", image: "https://via.placeholder.com/200x150?text=Vitamin+B12", category: "Vitamins" },
  { name: "Multivitamin", dosage: "Daily", brand: "Revital", price: 180, rating: 4.3, purpose: "Complete nutrition support", image: "https://via.placeholder.com/200x150?text=Multivitamin", category: "Vitamins" },
  
  // Chronic Care
  { name: "Metformin", dosage: "500mg", brand: "Glycomet", price: 120, rating: 4.3, purpose: "Type 2 diabetes management", image: "https://via.placeholder.com/200x150?text=Metformin", category: "Chronic Care" },
  { name: "Amlodipine", dosage: "5mg", brand: "Amlong", price: 85, rating: 4.2, purpose: "High blood pressure", image: "https://via.placeholder.com/200x150?text=Amlodipine", category: "Chronic Care" },
  { name: "Atorvastatin", dosage: "20mg", brand: "Lipitor", price: 150, rating: 4.4, purpose: "Cholesterol management", image: "https://via.placeholder.com/200x150?text=Atorvastatin", category: "Chronic Care" },
  
  // Respiratory
  { name: "Salbutamol Inhaler", dosage: "100mcg", brand: "Asthalin", price: 180, rating: 4.6, purpose: "Asthma and breathing problems", image: "https://via.placeholder.com/200x150?text=Salbutamol", category: "Respiratory" },
  { name: "Cetirizine", dosage: "10mg", brand: "Zyrtec", price: 25, rating: 4.3, purpose: "Allergy relief", image: "https://via.placeholder.com/200x150?text=Cetirizine", category: "Respiratory" },
  { name: "Cough Syrup", dosage: "100ml", brand: "Benadryl", price: 65, rating: 4.1, purpose: "Cough and cold relief", image: "https://via.placeholder.com/200x150?text=Cough+Syrup", category: "Respiratory" },
  
  // Digestive
  { name: "Omeprazole", dosage: "20mg", brand: "Omez", price: 75, rating: 4.4, purpose: "Acidity and heartburn", image: "https://via.placeholder.com/200x150?text=Omeprazole", category: "Digestive" },
  { name: "Probiotics", dosage: "Daily", brand: "Enterogermina", price: 95, rating: 4.5, purpose: "Digestive health", image: "https://via.placeholder.com/200x150?text=Probiotics", category: "Digestive" },
  { name: "Loperamide", dosage: "2mg", brand: "Imodium", price: 45, rating: 4.2, purpose: "Diarrhea relief", image: "https://via.placeholder.com/200x150?text=Loperamide", category: "Digestive" },
  
  // Women's Health
  { name: "Iron Tablets", dosage: "100mg", brand: "Ferrous", price: 35, rating: 4.3, purpose: "Iron deficiency anemia", image: "https://via.placeholder.com/200x150?text=Iron+Tablets", category: "Women's Health" },
  { name: "Folic Acid", dosage: "5mg", brand: "Folvite", price: 25, rating: 4.6, purpose: "Pregnancy support", image: "https://via.placeholder.com/200x150?text=Folic+Acid", category: "Women's Health" },
  { name: "Calcium", dosage: "500mg", brand: "Shelcal", price: 85, rating: 4.4, purpose: "Bone health", image: "https://via.placeholder.com/200x150?text=Calcium", category: "Women's Health" }
];

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "user"
  },
  {
    name: "Admin User",
    email: "admin@pharmacy.com",
    password: "admin123",
    role: "admin"
  }
];

const sampleMessages = [
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    subject: "Product Inquiry",
    message: "Hi, I wanted to know if you have insulin pens in stock. I need them urgently for my diabetes management."
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    subject: "Delivery Issue",
    message: "My order was supposed to arrive yesterday but I haven't received it yet. Can you please check the status?"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmacy');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Medicine.deleteMany({});
    await User.deleteMany({});
    await Message.deleteMany({});
    await Order.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    const medicines = await Medicine.insertMany(sampleMedicines);
    console.log(`Added ${medicines.length} medicines`);

    const users = await User.insertMany(sampleUsers);
    console.log(`Added ${users.length} users`);

    const messages = await Message.insertMany(sampleMessages);
    console.log(`Added ${messages.length} messages`);

    // Create a sample order
    const sampleOrder = {
      userId: users[0]._id,
      items: [
        {
          medicineId: medicines[0]._id,
          name: medicines[0].name,
          dosage: medicines[0].dosage,
          brand: medicines[0].brand,
          price: medicines[0].price,
          quantity: 2
        }
      ],
      total: medicines[0].price * 2,
      paymentMethod: "Credit Card",
      deliveryAddress: {
        fullName: "John Doe",
        phone: "9876543210",
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
      }
    };

    const order = await Order.create(sampleOrder);
    console.log(`Added sample order with ${sampleOrder.items.length} items`);
    console.log(`Total medicines in database: ${medicines.length}`);

    console.log('\n=== Database seeded successfully! ===');
    console.log('Categories available:');
    const categories = [...new Set(medicines.map(m => m.category))];
    categories.forEach(cat => {
      const count = medicines.filter(m => m.category === cat).length;
      console.log(`- ${cat}: ${count} medicines`);
    });
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();