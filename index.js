import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import adminRoutes from './routes/admin.js';
import authRoutes from './routes/auth.js';
import donationRoutes from './routes/donations.js';
import campaignRoutes from './routes/campaigns.js';

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Donation & Zakat Management System API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ error: 'GLOBAL BACKEND ERROR: ' + (err.message || 'Internal Server Error') });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
