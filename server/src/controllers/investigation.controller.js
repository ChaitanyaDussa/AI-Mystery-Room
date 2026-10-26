import { createHash } from 'node:crypto';
import Investigation from '../models/Investigation.js';
import MysteryCase from '../models/MysteryCase.js';
import { AppError } from '../utils/errors.js';
import { scoreAccusation } from '../services/scoring.service.js';

async function authorized(req) {
  if (!req.cookies?.imr_session) throw new AppError(401, 'SESSION_REQUIRED', 'Investigation session required.');
  const hash = createHash('sha256').update(req.cookies.imr_session).digest('hex');
  const investigation = await Investigation.findOne({ investigationId: req.params.investigationId, sessionTokenHash: hash });
  if (!investigation) throw new AppError(403, 'ACCESS_DENIED', 'You do not have access to this investigation.');
  return investigation;
}
export async function recordEvidenceView(req, res, next) {
  try { const investigation = await authorized(req); const item = await MysteryCase.findOne({ caseId: investigation.caseId }); if (!item?.evidence.some(e => e.id === req.params.evidenceId)) throw new AppError(404,'EVIDENCE_NOT_FOUND','Evidence not found.'); if (!investigation.viewedEvidenceIds.includes(req.params.evidenceId)) investigation.viewedEvidenceIds.push(req.params.evidenceId); await investigation.save(); res.json({ success: true, data: { viewedEvidenceIds: investigation.viewedEvidenceIds } }); }
  catch (error) { next(error); }
}
export async function submitAccusation(req, res, next) {
  try {
    const investigation = await authorized(req);
    if (investigation.status === 'completed') throw new AppError(409, 'ALREADY_COMPLETED', 'An accusation has already been submitted.');
    const mystery = await MysteryCase.findOne({ caseId: investigation.caseId }).select('+canonicalSolution');
    if (!mystery || mystery.status !== 'ready') throw new AppError(409, 'CASE_NOT_READY', 'This mystery is not ready.');
    if (!mystery.suspects.some(s => s.id === req.body?.suspectId)) throw new AppError(400, 'INVALID_SUSPECT', 'Select a suspect from this case.');
    const outcome = scoreAccusation(req.body.suspectId, mystery.canonicalSolution.culpritId);
    const updated = await Investigation.findOneAndUpdate({ _id: investigation._id, status: 'in_progress' }, { $set: { status: 'completed', finalAccusation: req.body.suspectId, ...outcome, completedAt: new Date() } }, { new: true });
    if (!updated) throw new AppError(409, 'ALREADY_COMPLETED', 'An accusation has already been submitted.');
    res.json({ success: true, data: { investigationId: updated.investigationId, status: updated.status, isCorrect: updated.isCorrect, score: updated.score } });
  } catch (error) { next(error); }
}
export async function getResults(req, res, next) {
  try {
    const investigation = await authorized(req); if (investigation.status !== 'completed') throw new AppError(409, 'INVESTIGATION_INCOMPLETE', 'Submit an accusation to see the solution.');
    const mystery = await MysteryCase.findOne({ caseId: investigation.caseId }).select('+canonicalSolution');
    const solution = mystery.canonicalSolution; const culprit = mystery.suspects.find(s => s.id === solution.culpritId);
    res.json({ success: true, data: { investigationId: investigation.investigationId, finalAccusation: investigation.finalAccusation, isCorrect: investigation.isCorrect, score: investigation.score, culprit: { id: culprit.id, name: culprit.name }, solution: { motive: solution.motive, method: solution.method, fullExplanation: solution.fullExplanation, deductionSteps: solution.deductionSteps, keyEvidence: mystery.evidence.filter(e => solution.keyEvidenceIds.includes(e.id)) } } });
  } catch (error) { next(error); }
}
