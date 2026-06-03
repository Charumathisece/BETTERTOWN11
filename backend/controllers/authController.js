const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Helper: parse admin emails from env
const getAdminEmails = () => {
  const raw = process.env.ADMIN_EMAILS || '';
  return raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
};
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    // 1. Check if user already exists (by email or phone number)
    let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (user) {
      let existingField = user.email === email ? 'Email' : 'Phone number';
      return res.status(400).json({ msg: `${existingField} already exists` });
    }

    // 2. Create new user instance
    user = new User({
      name,
      email,
      password, // We'll hash this next
      phoneNumber,
    });

    // 3. Hash password
    const salt = await bcrypt.genSalt(10); // Generate a salt
    user.password = await bcrypt.hash(password, salt); // Hash the password

    // 4. Set isAdmin if this email is listed in ADMIN_EMAILS, then save
    const adminEmails = getAdminEmails();
    if (adminEmails.includes(email.toLowerCase())) {
      user.isAdmin = true;
    }

    await user.save();

    // 5. Create JWT Payload
    const payload = {
      user: {
        id: user.id, // Mongoose uses id, not _id, virtually
        isAdmin: user.isAdmin,
      },
    };

    // 6. Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret from .env
      { expiresIn: 3600 }, // Token expires in 1 hour (3600 seconds)
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token }); // Send token back to client
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    // 1. Check if user exists by email or phone number
    // Use a flexible query to check both fields
    let user = await User.findOne({ 
      $or: [
        { email: emailOrPhone }, 
        { phoneNumber: emailOrPhone }
      ]
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 2. Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // 3. Passwords match. Ensure admin flag is set if email is in ADMIN_EMAILS
    const adminEmailsLogin = getAdminEmails();
    if (adminEmailsLogin.includes(user.email.toLowerCase()) && !user.isAdmin) {
      user.isAdmin = true;
      try { await user.save(); } catch (e) { console.error('Failed to update isAdmin on login', e); }
    }

    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    };

    // 4. Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send token back
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
