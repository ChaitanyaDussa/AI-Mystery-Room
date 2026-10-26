import MysteryCase from '../models/MysteryCase.js';
import Investigation from '../models/Investigation.js';
import { createMystery } from '../services/mystery-generation.service.js';
import { AppError } from '../utils/errors.js';

const publicSuspect = ({ id, name, role, biography, motive, statement, alibi, publicInfo }) => ({ id, name, role, biography, motive, statement, alibi, publicInfo });
const requireCase = async caseId => { const item = await MysteryCase.findOne({ caseId }); if (!item) throw new AppError(404, 'CASE_NOT_FOUND', 'Mystery not found.'); return item; };

export async function postMystery(req, res, next) {
  try { const record = await createMystery(req.validatedBody); res.status(202).json({ success: true, data: { caseId: record.caseId, status: record.status } }); }
  catch (error) { next(error); }
}
export async function getStatus(req, res, next) {
  try { const item = await requireCase(req.params.caseId); res.json({ success: true, data: { caseId: item.caseId, status: item.status, progressStage: item.status === 'ready' ? 'complete' : item.status, error: item.status === 'failed' ? { code: item.generationErrorCode, message: 'This mystery could not be generated.' } : undefined } }); }
  catch (error) { next(error); }
}
export async function getMystery(req, res, next) {
  try { const item = await requireCase(req.params.caseId); if (item.status !== 'ready') throw new AppError(409, 'CASE_NOT_READY', 'This mystery is not ready yet.'); res.json({ success: true, data: { caseId: item.caseId, title: item.title, scenario: item.scenario, genre: item.genre, difficulty: item.difficulty, caseLength: item.caseLength, synopsis: item.synopsis, objectives: item.objectives, suspects: item.suspects.map(publicSuspect), timeline: item.timeline, evidenceCount: item.evidence.length, status: item.status, createdAt: item.createdAt } }); }
  catch (error) { next(error); }
}
export async function getEvidence(req, res, next) {
  try {
    const item = await requireCase(req.params.caseId);
    const page = Math.max(1, Number(req.query.page) || 1), limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
    const search = String(req.query.search || '').slice(0, 100).toLowerCase();
    let rows = item.evidence.filter(x => (!req.query.type || x.type === req.query.type) && (!req.query.suspectId || x.suspectIds.includes(req.query.suspectId)) && (!search || `${x.title} ${x.description}`.toLowerCase().includes(search)));
    res.json({ success: true, data: { items: rows.slice((page-1)*limit, page*limit), pagination: { page, limit, total: rows.length, pages: Math.ceil(rows.length/limit) } } });
  } catch (error) { next(error); }
}
export async function getEvidenceDetail(req, res, next) {
  try { const item = await requireCase(req.params.caseId); const evidence = item.evidence.find(x => x.id === req.params.evidenceId); if (!evidence) throw new AppError(404, 'EVIDENCE_NOT_FOUND', 'Evidence not found.'); res.json({ success: true, data: evidence }); }
  catch (error) { next(error); }
}
export async function createInvestigation(req, res, next) {
  try {
    const item = await requireCase(req.params.caseId); if (item.status !== 'ready') throw new AppError(409, 'CASE_NOT_READY', 'This mystery is not ready yet.');
    const crypto = await import('node:crypto'); const token = crypto.randomBytes(32).toString('base64url');
    const sessionTokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const investigationId = crypto.randomBytes(18).toString('base64url');
    await Investigation.create({ investigationId, caseId: item.caseId, sessionTokenHash });
    res.cookie('imr_session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/api/v1', maxAge: 30*24*60*60*1000 });
    res.status(201).json({ success: true, data: { investigationId, caseId: item.caseId, status: 'in_progress' } });
  } catch (error) { next(error); }
}
