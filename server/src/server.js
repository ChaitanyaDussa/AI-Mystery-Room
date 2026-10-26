import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';

try {
  await connectDatabase();
  app.listen(env.port, () => console.log(`AI Mystery Room API listening on port ${env.port}`));
} catch (error) {
  console.error('Server startup failed. Check MongoDB configuration and availability.');
  if (env.nodeEnv !== 'production') console.error(error.message);
  process.exit(1);
}
