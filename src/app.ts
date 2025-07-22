import express from 'express';
import registerRoutes from './routes/registerRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/api/register', registerRoutes);

app.use(errorHandler);

export default app;