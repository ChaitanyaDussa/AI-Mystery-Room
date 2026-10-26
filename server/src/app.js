import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import apiRoutes from './routes/api.routes.js';
import { errorHandler, notFound } from './middleware/error.middleware.js';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json({ limit: '32kb' }));
app.use(cookieParser());
app.use('/api/v1', apiRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
