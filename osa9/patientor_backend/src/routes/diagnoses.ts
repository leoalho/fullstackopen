import express from 'express';
import {getEntries} from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(getEntries());
  });

export default router;