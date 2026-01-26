import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes.ts';
import cors from 'cors';

mongoose.connect('mongodb://mongodb:27017/ChargeAndTrackDB');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);

export default app;
