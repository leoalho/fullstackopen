import patientData from '../../data/patients.json';
import { Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

export const getEntries = (): Array<Patient> => {
    return patients;
};

export const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {id, name, dateOfBirth, gender, occupation};
    });
};

export const newPatient = (entry: NewPatient): Patient => {
    const id: string = uuid();
    const new_patient: Patient = {id, ... entry};
    patients.push(new_patient);
    return new_patient;
};