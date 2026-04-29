const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  roi: { type: String, required: true }, // e.g., "10% monthly"
  duration: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
