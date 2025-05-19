import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    transcriptText: { type: String },
    fileUrl: { type: String },
    source: { type: String, enum: ['zoom', 'google-meet', 'others'], required: true },
    status: { type: String, enum: ['processing', 'completed'], default: 'processing' },
    analytics: {
        type: Object,
        default: null,
    },
}, { timestamps: true });

export const Meeting = mongoose.model('Meeting', meetingSchema);