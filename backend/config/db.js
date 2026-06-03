// const mongoose = require('mongoose');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables from .env file

// const connectDB = async () => {
//   try {
//     console.log(`Attempting to connect to MongoDB at ${process.env.MONGO_URI.substring(0, 30)}...`); // Log before connect
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       // Mongoose 6+ doesn't need useNewUrlParser/UnifiedTopology
//       // Add server selection timeout if needed, e.g.:
//       // serverSelectionTimeoutMS: 5000 // 5 seconds
//     });

//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error('-------------------------------------------');
//     console.error('MongoDB Connection Error:');
//     console.error(`Message: ${err.message}`);
//     console.error(`Reason: ${err.reason || 'N/A'}`); // Mongoose might provide a reason
//     console.error(`Full Error:`, err); // Log the full error object
//     console.error('-------------------------------------------');
//     process.exit(1); // Exit process with failure
//   }
// };

// module.exports = connectDB;


const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    // Fail fast with a clear message if MONGO_URI is not provided
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI environment variable is not set.');
      console.error('Create a .env file in the backend folder with: MONGO_URI="your-mongodb-uri"');
      process.exit(1);
    }

    console.log("Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("-------------------------------------------");
    console.error("MongoDB Connection Error:");
    console.error(`Message: ${err.message}`);
    console.error(`Reason: ${err.reason || "N/A"}`);
    console.error("Full Error:", err);
    console.error("-------------------------------------------");
    process.exit(1);
  }
};

module.exports = connectDB;