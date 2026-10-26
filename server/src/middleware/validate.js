import { AppError } from '../utils/errors.js';
export function validateBody(schema) { return (req, res, next) => { const result = schema.safeParse(req.body); if (!result.success) return next(new AppError(400, 'INVALID_REQUEST', result.error.issues[0]?.message || 'Invalid request.')); req.validatedBody = result.data; next(); }; }
