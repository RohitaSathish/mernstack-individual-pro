const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  reply: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'replied'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);