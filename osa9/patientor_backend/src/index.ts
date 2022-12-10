import express from 'express';
import diagnoseRouter from './routes/diagnoses'
import patientRouter from './routes/patients'

const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});