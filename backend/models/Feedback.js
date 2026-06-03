const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  feedbackText: {
    type: String,
    required: [true, 'Feedback text is required'],
    trim: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    // Optional: make rating required if you have a rating input
    // required: [true, 'Rating is required'], 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
