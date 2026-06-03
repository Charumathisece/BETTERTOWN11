const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback } = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/authMiddleware');

// Route for submitting feedback (POST /api/feedback)
// Requires user to be logged in (protect middleware)
router.post('/', protect, submitFeedback);

// Route for getting all feedback (GET /api/feedback)
// Requires user to be logged in AND be an admin (protect and admin middleware)
router.get('/', protect, admin, getAllFeedback);

module.exports = router;
