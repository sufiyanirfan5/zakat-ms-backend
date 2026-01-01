import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import Campaign from '../models/Campaign.js';

const router = express.Router();

// @desc    Get all active campaigns
// @route   GET /api/campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find({ status: 'Active' }).sort({ createdAt: -1 });
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// @desc    Create a new campaign
// @route   POST /api/campaigns
router.post('/', protect, admin, async (req, res) => {
    const { title, description, goalAmount, category, imageUrl, deadline } = req.body;

    try {
        const campaign = await Campaign.create({
            title,
            description,
            goalAmount,
            category,
            imageUrl,
            deadline
        });

        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
