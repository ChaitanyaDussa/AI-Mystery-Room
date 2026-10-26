import { z } from 'zod';

export const createMysterySchema = z.object({
  title: z.string().trim().max(100).optional(),
  scenario: z.string().trim().min(30, 'Scenario must be at least 30 characters.').max(5000),
  genre: z.enum(['theft','disappearance','betrayal','cyber','college','office','locked_room','general']),
  difficulty: z.enum(['easy','medium','hard']),
  caseLength: z.enum(['short','standard']).default('short')
});
