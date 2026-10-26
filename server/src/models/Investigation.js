import mongoose from 'mongoose';

const InvestigationSchema = new mongoose.Schema({
  investigationId: { type: String, unique: true, index: true, required: true }, caseId: { type: String, index: true, required: true }, sessionTokenHash: { type: String, required: true, index: true },
  status: { type: String, enum: ['in_progress','completed'], default: 'in_progress' }, viewedEvidenceIds: { type: [String], default: [] }, finalAccusation: String, isCorrect: Boolean, score: Number, completedAt: Date
}, { timestamps: true });

export default mongoose.models.Investigation || mongoose.model('Investigation', InvestigationSchema);
