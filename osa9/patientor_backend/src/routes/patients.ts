import express from 'express';
import { getNonSensitiveEntries, newPatient, newHospitalEntry, getPatient, newHealthcheckEntry, newOccupationalEntry, addEntry } from '../services/patientService';
import { toNewHospitalEntry, toNewHealthcheckEntry, toNewPatient, toNewOcupationalEntry } from '../utils';

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
    res.json(getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
    const patient = getPatient(req.params.id);
    if (patient){  
        try{
            switch (req.body.type){
            case "Hospital":
                const newHEntry = toNewHospitalEntry(req.body);
                const newHEntryId = newHospitalEntry(newHEntry);
                addEntry(newHEntryId, patient);
                res.json(newHEntryId);
                return;
            case "HealthCheck":
                const newHealthEntry = toNewHealthcheckEntry(req.body);
                const newHealthEntryId = newHealthcheckEntry(newHealthEntry);
                addEntry(newHealthEntryId, patient);
                res.json(newHealthEntryId);
                return;
            case "OccupationalHealthcare":
                const newEntry = toNewOcupationalEntry(req.body);
                const newEntryId = newOccupationalEntry(newEntry);
                addEntry(newEntryId, patient);
                res.json(newEntryId);
                return;
            default:
                return;
            }
        } catch (error: unknown){
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
            }
            res.status(400).send(errorMessage);
        }
    }
});
    
export default router;