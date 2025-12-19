const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pharmacy');
    console.log('Connected to MongoDB');

    // Delete existing admin if any
    await User.deleteOne({ email: 'admin@pharmacy.com' });
    
    // Create new admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@pharmacy.com',
      password: 'admin123',
      role: 'admin'
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@pharmacy.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();