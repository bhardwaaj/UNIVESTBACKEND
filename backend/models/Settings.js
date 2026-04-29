const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'whatsapp'
  value: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
