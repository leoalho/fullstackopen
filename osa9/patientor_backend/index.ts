import express from 'express';
import diagnoseRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';
import cors = require('cors');
import { Request } from "express";

const app = express();

app.use(express.json());
app.use(cors<Request>());
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});