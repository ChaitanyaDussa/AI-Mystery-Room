import { z } from 'zod';

const suspect = z.object({ id: z.string().min(1), name: z.string().min(1), role: z.string(), biography: z.string(), motive: z.string(), statement: z.string(), alibi: z.string(), publicInfo: z.string().optional().default('') });
const timelineEvent = z.object({ id: z.string().min(1), timestamp: z.string().datetime({ offset: true }), description: z.string().min(1), suspectIds: z.array(z.string()).default([]), evidenceIds: z.array(z.string()).default([]) });
const evidence = z.object({ id: z.string().min(1), type: z.enum(['message','image','cctv','witness_statement','interview','physical_clue','document']), title: z.string().min(1), description: z.string(), content: z.any(), createdAtInStory: z.string().optional().default(''), suspectIds: z.array(z.string()).default([]), timelineEventIds: z.array(z.string()).default([]), visibility: z.enum(['public','hidden']).default('public'), media: z.array(z.any()).default([]) });

export const generatedCaseSchema = z.object({
  title: z.string().min(3).max(120), genre: z.string(), difficulty: z.string(), synopsis: z.string().min(20), objectives: z.array(z.string()).min(1), suspects: z.array(suspect).min(3).max(8), witnesses: z.array(z.any()).default([]), timeline: z.array(timelineEvent).min(3), evidence: z.array(evidence).min(6),
  solution: z.object({ culpritId: z.string(), motive: z.string(), method: z.string(), deductionSteps: z.array(z.string()).min(2), keyEvidenceIds: z.array(z.string()).min(1), fullExplanation: z.string().min(30) })
});
