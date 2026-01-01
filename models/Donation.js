import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['Zakat', 'Donation', 'Sadaqah'], required: true },
    status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
    transactionId: { type: String },
    receiptUrl: { type: String },
    verifiedAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', donationSchema);
export default Donation;
