import express from 'express';
import { getNonSensitiveEntries, newPatient, getPatient } from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(getNonSensitiveEntries());
  });

router.post('/', (req, res) => {
    try{
        const newPatientEntry = toNewPatient(req.body);
        const new_patient = newPatient(newPatientEntry);
        res.json(new_patient);
    } catch (error: unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.get('/:id', (req, res) => {
    res.json(getPatient(req.params.id))
})
  
export default router;