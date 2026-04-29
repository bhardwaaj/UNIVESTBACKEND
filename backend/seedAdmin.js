const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGODB_URI = 'mongodb+srv://admin:admin@cluster0.tphinzi.mongodb.net/univest?retryWrites=true&w=majority';

const generateRefId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    const adminEmail = 'admin@univest.com';
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    let adminUser = await User.findOne({ email: adminEmail });

    if (adminUser) {
      adminUser.password = hashedPassword;
      adminUser.role = 'admin';
      await adminUser.save();
      console.log('Existing Admin user updated! Email: admin@univest.com, Password: admin123');
      process.exit(0);
    } else {
        const referenceId = generateRefId();
        adminUser = new User({
          name: 'Super Admin',
          email: adminEmail,
          password: hashedPassword,
          role: 'admin',
          referenceId
        });

        await adminUser.save();
        console.log('Admin user created successfully! Email: admin@univest.com, Password: admin123');
        process.exit(0);
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
