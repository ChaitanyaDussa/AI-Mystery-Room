import mongoose from 'mongoose';

const MysteryCaseSchema = new mongoose.Schema({
  caseId: { type: String, unique: true, index: true, required: true }, title: String, scenario: String,
  genre: String, difficulty: String, caseLength: String, synopsis: String, objectives: [String],
  suspects: [mongoose.Schema.Types.Mixed], witnesses: [mongoose.Schema.Types.Mixed], timeline: [mongoose.Schema.Types.Mixed], evidence: [mongoose.Schema.Types.Mixed],
  canonicalSolution: { type: mongoose.Schema.Types.Mixed, select: false }, status: { type: String, enum: ['generating','processing_evidence','ready','failed'], default: 'generating', index: true },
  generationAttempts: { type: Number, default: 0 }, generationErrorCode: String, version: { type: Number, default: 1 }
}, { timestamps: true, minimize: false });

export default mongoose.models.MysteryCase || mongoose.model('MysteryCase', MysteryCaseSchema);
