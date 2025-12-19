const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');
const Order = require('./models/Order');
const RegistrationCredential = require('./models/RegistrationCredential');
require('dotenv').config();

async function createTestData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmacy');
    console.log('Connected to MongoDB');

    // Create test user
    const testUser = new User({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
      role: 'user'
    });
    await testUser.save();
    console.log('Test user created');

    // Create registration credential
    await new RegistrationCredential({
      userId: testUser._id,
      name: testUser.name,
      email: testUser.email,
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }).save();
    console.log('Registration credential created');

    // Create test message
    await new Message({
      name: 'Jane Smith',
      email: 'jane@test.com',
      subject: 'Medicine Inquiry',
      message: 'I need information about pain relief medicines.',
      status: 'pending'
    }).save();
    console.log('Test message created');

    // Create test order
    await new Order({
      userId: testUser._id,
      items: [{
        medicineId: new mongoose.Types.ObjectId(),
        name: 'Paracetamol',
        dosage: '500mg',
        brand: 'Crocin',
        price: 25,
        quantity: 2
      }],
      total: 50,
      paymentMethod: 'Cash on Delivery',
      deliveryAddress: {
        fullName: 'John Doe',
        phone: '9876543210',
        address: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001'
      },
      status: 'pending'
    }).save();
    console.log('Test order created');

    console.log('All test data created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test data:', error);
    process.exit(1);
  }
}

createTestData();