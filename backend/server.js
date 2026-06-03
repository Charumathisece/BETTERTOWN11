const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

// Connect Database
connectDB();

// Simple request logger
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.path}`);
  next();
});

// Init Middleware
app.use(cors()); // Use default CORS settings (allows all origins)

app.use(express.json({ limit: '50mb', extended: false })); // Allows us to accept JSON data in the body
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Define Routes (We will add the auth route later)
app.get('/', (req, res) => res.send('API Running')); // Simple test route

// Define Auth Routes
app.use('/api/auth', require('./routes/auth'));

// Define Feedback Routes
app.use('/api/feedback', require('./routes/feedbackRoutes'));

// Define Issue Routes
app.use('/api/issues', require('./routes/issueRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
