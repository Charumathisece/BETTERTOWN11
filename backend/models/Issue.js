const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please provide an issue category'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide an issue description'],
    trim: true,
  },
  location: {
    // GeoJSON Point format for potential future geospatial queries
    type: {
      type: String,
      enum: ['Point'],
      // required: true // Make optional for now if lat/lng isn't always available
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      // required: true
      index: '2dsphere' // Index for geospatial queries
    },
    address: { // Store the user-inputted address string as well
        type: String,
        trim: true
    }
  },
  landmark: {
    type: String,
    trim: true,
  },
  photos: [
    {
      type: String, // Store image URLs (e.g., from Cloudinary or similar service)
    },
  ],
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your user model is named 'User'
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
    default: 'Pending',
  },
  adminFeedback: {
      type: String,
      trim: true,
      default: ''
  },
  complaintId: {
      type: String,
      unique: true, 
      // We'll generate this in the controller before saving
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Pre-save hook to generate a unique complaint ID (optional, can be done in controller too)
issueSchema.pre('save', async function(next) {
  if (this.isNew && !this.complaintId) {
    // Generate a simple unique ID (you might want a more robust library like nanoid)
    this.complaintId = `BT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }
  next();
});


const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
