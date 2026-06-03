const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

// Simple arg parser for --email, --password, --phone, --name
const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const key = argv[i].slice(2);
    const val = argv[i+1] && !argv[i+1].startsWith('--') ? argv[i+1] : true;
    args[key] = val;
    if (val !== true) i++;
  }
}

const email = args.email || (process.env.ADMIN_EMAILS && process.env.ADMIN_EMAILS.split(',')[0]);
const password = args.password;
const phoneNumber = args.phone;
const name = args.name || 'Admin';

if (!email || !password) {
  console.error('Usage: node scripts/setAdminPassword.js --email admin@domain.com --password NewPass123! [--phone 0123456789] [--name "Admin Name"]');
  process.exit(1);
}

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    let user = await User.findOne({ email: email });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    if (user) {
      user.password = hashed;
      if (!user.isAdmin) user.isAdmin = true;
      await user.save();
      console.log(`Updated password for existing user ${email}`);
    } else {
      if (!phoneNumber) {
        console.error('User not found. To create a new admin user please provide --phone PHONE_NUMBER');
        process.exit(1);
      }
      user = new User({ name, email, password: hashed, phoneNumber, isAdmin: true });
      await user.save();
      console.log(`Created new admin user ${email}`);
    }

    await mongoose.disconnect();
    console.log('Done. You can now log in with the updated credentials.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}

run();
