import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Donation from '../models/Donation.js';

const router = express.Router();

// @desc    Create new donation
// @route   POST /api/donations
router.post('/', protect, async (req, res) => {
    const { amount, type, category, paymentMethod, campaignId, campaignName } = req.body;

    try {
        const donation = await Donation.create({
            donorId: req.user._id,
            amount,
            type,
            category,
            paymentMethod,
            campaignId, // If using MongoDB IDs, this would be an ObjectId, but for now keeping it flexible
            campaignName,
            status: 'Pending'
        });

        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Get user donations
// @route   GET /api/donations
router.get('/', protect, async (req, res) => {
    try {
        const donations = await Donation.find({ donorId: req.user._id }).sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
