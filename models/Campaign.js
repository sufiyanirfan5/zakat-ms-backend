import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    category: { type: String, required: true },
    imageUrl: { type: String },
    deadline: { type: Date },
    status: { type: String, enum: ['Active', 'Completed', 'Paused'], default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
