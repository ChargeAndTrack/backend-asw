import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/routes.ts';

mongoose.connect('mongodb://mongodb:27017/ChargeAndTrackDB');

const app = express();
app.use(express.json());
app.use('/api/v1', routes);

export default app;
