import { AppError } from '../utils/errors.js';

export function notFound(req, res, next) { next(new AppError(404, 'NOT_FOUND', 'The requested resource was not found.')); }
export function errorHandler(error, req, res, next) {
  const status = error instanceof AppError ? error.status : (error.name === 'ValidationError' ? 400 : 500);
  if (status >= 500) console.error(error);
  res.status(status).json({ success: false, error: { code: error.code || (status === 400 ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR'), message: error instanceof AppError || status === 400 ? error.message : 'Something went wrong. Please try again.' } });
}
