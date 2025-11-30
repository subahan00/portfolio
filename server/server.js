// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows our React client to talk to this server
app.use(express.json()); // Allows server to accept JSON in request bodies

// --- Test Route ---
// This is the endpoint our React app will hit
app.get('/api/test', (req, res) => {
  res.json({ message: "Hello from the server!" });
});
// --------------------

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});