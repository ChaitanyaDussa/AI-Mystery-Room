import { generatedCaseSchema } from '../schemas/case.schema.js';
import { AppError } from '../utils/errors.js';

export function validateGeneratedCase(raw, input) {
  const parsed = generatedCaseSchema.safeParse(raw);
  if (!parsed.success) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated case did not pass validation. Please retry.');
  const data = parsed.data;
  const all = [...data.suspects, ...data.timeline, ...data.evidence];
  const ids = all.map(x => x.id);
  if (new Set(ids).size !== ids.length) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated case contained duplicate identifiers. Please retry.');
  const suspectIds = new Set(data.suspects.map(x => x.id));
  const eventIds = new Set(data.timeline.map(x => x.id));
  const evidenceIds = new Set(data.evidence.map(x => x.id));
  if (!suspectIds.has(data.solution.culpritId)) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated solution did not match a suspect. Please retry.');
  for (const ev of data.evidence) if (ev.suspectIds.some(id => !suspectIds.has(id)) || ev.timelineEventIds.some(id => !eventIds.has(id))) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated evidence has invalid references. Please retry.');
  for (const event of data.timeline) if (event.suspectIds.some(id => !suspectIds.has(id)) || event.evidenceIds.some(id => !evidenceIds.has(id))) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated timeline has invalid references. Please retry.');
  const timestamps = data.timeline.map(event => Date.parse(event.timestamp));
  if (timestamps.some((value, i) => i > 0 && value < timestamps[i - 1])) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated timeline is not chronological. Please retry.');
  if (data.solution.keyEvidenceIds.some(id => !evidenceIds.has(id)) || data.evidence.filter(x => x.visibility === 'public').length < (input.caseLength === 'standard' ? 9 : 6)) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated case is incomplete. Please retry.');
  if (input.caseLength === 'standard' && data.suspects.length < 4) throw new AppError(502, 'INVALID_AI_OUTPUT', 'The generated case has too few suspects. Please retry.');
  return { ...data, genre: input.genre, difficulty: input.difficulty };
}
