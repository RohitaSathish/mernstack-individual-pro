const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginCredential = require('../models/LoginCredential');
const RegistrationCredential = require('../models/RegistrationCredential');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    // Save registration credentials
    await new RegistrationCredential({
      userId: user._id,
      name,
      email,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }).save();

    // Save registration as first login
    await new LoginCredential({
      userId: user._id,
      email,
      loginStatus: 'success',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }).save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      // Save failed login attempt
      await new LoginCredential({
        userId: user?._id,
        email,
        loginStatus: 'failed',
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }).save();
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Save successful login
    await new LoginCredential({
      userId: user._id,
      email,
      loginStatus: 'success',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    }).save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;