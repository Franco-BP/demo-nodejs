import express from 'express';
import registerRoutes from './routes/registerRoutes';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/register', registerRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);

export default app;