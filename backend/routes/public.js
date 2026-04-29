const express = require('express');
const Package = require('../models/Package');
const Settings = require('../models/Settings');
const Contact = require('../models/Contact');

const router = express.Router();

router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/settings/whatsapp', async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: 'whatsapp' });
    res.json({ whatsapp: setting ? setting.value : '' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
