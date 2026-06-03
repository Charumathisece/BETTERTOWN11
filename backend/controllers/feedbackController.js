const Feedback = require('../models/Feedback');

// @desc    Submit new feedback
// @route   POST /api/feedback
// @access  Private (Logged-in Users)
const submitFeedback = async (req, res) => {
  const { feedbackText, rating } = req.body;

  if (!feedbackText) {
    return res.status(400).json({ message: 'Feedback text is required' });
  }

  try {
    const newFeedback = new Feedback({
      user: req.user._id, // Get user ID from protect middleware
      feedbackText,
      rating, // Optional rating
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Server error while submitting feedback' });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private (Admins only)
const getAllFeedback = async (req, res) => {
  try {
    // Fetch all feedback, populate user details (e.g., name, email) excluding password
    const feedback = await Feedback.find({}).populate('user', 'name email').sort({ createdAt: -1 }); // Sort by newest first
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Server error while fetching feedback' });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
};
