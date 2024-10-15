// models/Message.js
const mongoose = require('mongoose');

const messageModel = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  content: { type: String, required: true },
}, {
  timestamps:true,
});

module.exports = mongoose.model('Message', messageModel);
