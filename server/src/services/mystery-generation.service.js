import { randomBytes } from 'node:crypto';
import MysteryCase from '../models/MysteryCase.js';
import { generateWithGemini } from './gemini.service.js';
import { validateGeneratedCase } from './consistency-validator.service.js';
import { env } from '../config/env.js';

export async function createMystery(input) {
  const caseId = randomBytes(24).toString('base64url');
  const record = await MysteryCase.create({ caseId, ...input, title: input.title || 'Untitled Mystery', status: 'generating' });
  let lastError;
  for (let attempt = 1; attempt <= env.generationMaxRetries + 1; attempt += 1) {
    record.generationAttempts = attempt;
    try {
      const generated = validateGeneratedCase(await generateWithGemini(input), input);
      record.title = input.title || generated.title;
      record.synopsis = generated.synopsis; record.objectives = generated.objectives; record.suspects = generated.suspects;
      record.witnesses = generated.witnesses; record.timeline = generated.timeline;
      record.evidence = generated.evidence.filter(item => item.visibility === 'public');
      record.canonicalSolution = generated.solution; record.status = 'ready';
      await record.save();
      return record;
    } catch (error) {
      lastError = error;
      if (error.code === 'AI_NOT_CONFIGURED') break;
    }
  }
  record.status = 'failed'; record.generationErrorCode = lastError?.code || 'GENERATION_FAILED';
  await record.save();
  throw lastError;
}
