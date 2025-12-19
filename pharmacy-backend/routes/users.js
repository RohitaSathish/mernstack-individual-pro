const express = require('express');
const User = require('../models/User');
const LoginCredential = require('../models/LoginCredential');
const RegistrationCredential = require('../models/RegistrationCredential');
const { adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all users
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get registration credentials
router.get('/registration-credentials', adminAuth, async (req, res) => {
  try {
    const credentials = await RegistrationCredential.find()
      .populate('userId', 'name email role')
      .sort({ registrationTime: -1 });
    res.json(credentials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get login credentials
router.get('/login-credentials', adminAuth, async (req, res) => {
  try {
    const credentials = await LoginCredential.find()
      .populate('userId', 'name email role')
      .sort({ loginTime: -1 })
      .limit(100);
    res.json(credentials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;