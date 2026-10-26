import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';
import { AppError } from '../utils/errors.js';
import { generateCasePrompt } from '../prompts/generate-case.prompt.js';

export async function generateWithGemini(input) {
  if (!env.geminiApiKey) throw new AppError(503, 'AI_NOT_CONFIGURED', 'Mystery generation is unavailable until a Gemini API key is configured.');
  const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });
  let timer;
  try {
    const timeout = new Promise((_, reject) => { timer = setTimeout(() => reject(new AppError(504, 'AI_TIMEOUT', 'Mystery generation took too long. Please try again.')), env.generationTimeoutMs); });
    const response = await Promise.race([ai.models.generateContent({ model: env.geminiModel, contents: generateCasePrompt(input), config: { responseMimeType: 'application/json', temperature: 0.8 } }), timeout]);
    const raw = response.text;
    if (!raw) throw new Error('Empty model response');
    return JSON.parse(raw);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(502, 'AI_GENERATION_FAILED', 'The case could not be generated. Please try again.');
  } finally { clearTimeout(timer); }
}
