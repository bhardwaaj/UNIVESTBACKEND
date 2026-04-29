const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  referenceId: { type: String, unique: true }, // 10 digit random char/number
  walletBalance: { type: Number, default: 0 },
  currentTip: { type: String, default: '' },
  paymentStatus: { type: String, default: 'Pending' },
  pendingRequests: { type: Number, default: 0 },
  stages: { type: String, default: 'Stage 1' },
  hasSelectedPackage: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
