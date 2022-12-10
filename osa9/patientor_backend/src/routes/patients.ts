import express from 'express';
import { getNonSensitiveEntries} from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(getNonSensitiveEntries());
  });

export default router