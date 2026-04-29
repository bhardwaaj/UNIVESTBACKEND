const express = require('express');
const User = require('../models/User');
const Package = require('../models/Package');
const Settings = require('../models/Settings');
const Contact = require('../models/Contact');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

// Manage Users
router.get('/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  res.json(user);
});

router.put('/users/:id', async (req, res) => {
  const { walletBalance, currentTip, paymentStatus, pendingRequests, stages } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, {
    walletBalance, currentTip, paymentStatus, pendingRequests, stages
  }, { new: true }).select('-password');
  res.json(user);
});

router.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Manage Packages
router.post('/packages', async (req, res) => {
  const newPackage = new Package(req.body);
  await newPackage.save();
  res.status(201).json(newPackage);
});

router.put('/packages/:id', async (req, res) => {
  const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedPackage);
});

router.delete('/packages/:id', async (req, res) => {
  await Package.findByIdAndDelete(req.params.id);
  res.json({ message: 'Package deleted' });
});

// Settings
router.post('/settings/whatsapp', async (req, res) => {
  const { whatsapp } = req.body;
  let setting = await Settings.findOne({ key: 'whatsapp' });
  if (setting) {
    setting.value = whatsapp;
    await setting.save();
  } else {
    setting = new Settings({ key: 'whatsapp', value: whatsapp });
    await setting.save();
  }
  res.json(setting);
});

// Contacts
router.get('/contacts', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

module.exports = router;
