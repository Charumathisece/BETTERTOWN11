const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and attach user to req
const protect = async (req, res, next) => {
  let token;

  console.log('Auth Header:', req.headers.authorization);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded);

      // Get user from the token (excluding password)
      req.user = await User.findById(decoded.user.id).select('-password'); // <-- Correct path to ID
      console.log('Found User:', req.user);

      if (!req.user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    console.log('No token found in header');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if user is an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
  }
};

module.exports = { protect, admin };
