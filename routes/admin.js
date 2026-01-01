import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Donation from '../models/Donation.js';
import User from '../models/User.js';

const router = express.Router();

// Get all donations for admin
router.get('/donations', protect, admin, async (req, res) => {
  try {
    const donations = await Donation.find({}).populate('donorId', 'firstName lastName name email');
    res.send(donations);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all users for admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Get all donations summary
router.get('/donations/summary', protect, admin, async (req, res) => {
  try {
    const donations = await Donation.find({});
    
    const summary = {
      totalAmount: donations.reduce((sum, d) => sum + d.amount, 0),
      count: donations.length,
      pendingCount: donations.filter(d => d.status === 'Pending').length
    };
    
    res.send(summary);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Verify a donation
router.post('/donations/:id/verify', protect, admin, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
        return res.status(404).send({ error: 'Donation not found' });
    }

    donation.status = 'Verified';
    donation.verifiedAt = new Date();
    await donation.save();

    res.send({ message: 'Donation verified successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
