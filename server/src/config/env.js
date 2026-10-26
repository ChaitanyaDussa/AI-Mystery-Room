import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const configDirectory = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(configDirectory, '../../../.env') });
dotenv.config({ path: resolve(configDirectory, '../../.env'), override: true });

const number = (name, fallback) => {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} must be a positive number.`);
  return value;
};

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: number('PORT', 5000),
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ai_mystery_room',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  generationTimeoutMs: number('CASE_GENERATION_TIMEOUT_MS', 60000),
  generationMaxRetries: Math.min(number('CASE_GENERATION_MAX_RETRIES', 2), 3),
  rateLimitWindowMs: number('RATE_LIMIT_WINDOW_MS', 60000),
  rateLimitMaxRequests: number('RATE_LIMIT_MAX_REQUESTS', 10)
};
