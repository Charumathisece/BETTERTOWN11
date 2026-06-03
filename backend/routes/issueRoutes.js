const express = require('express');
const router = express.Router();
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  getMyIssues
} = require('../controllers/issueController');

// Assuming you have authentication middleware
// Import your authentication middleware (e.g., protect) and admin check middleware
const { protect, admin } = require('../middleware/authMiddleware'); // Adjust path as needed

// Route to get current user's issues
router.get('/my', protect, getMyIssues);

// Route to create a new issue (requires user authentication)
router.post('/', protect, createIssue);

// Route to get all issues (requires admin authentication)
router.get('/', protect, admin, getIssues);

// Route to get a single issue by ID (requires admin authentication)
router.get('/:id', protect, admin, getIssueById);

// Route to update an issue (status, feedback) (requires admin authentication)
router.put('/:id', protect, admin, updateIssue);


module.exports = router;
