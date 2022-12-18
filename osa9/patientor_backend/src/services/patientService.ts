import patientData from '../../data/patients';
import { Patient, NewPatient, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

export const getEntries = (): Array<Patient> => {
    return patients;
};

export const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => {
        return {id, name, dateOfBirth, gender, occupation, entries};
    });
};

export const addEntry = (entry: Entry, patient: Patient) => {
    patient.entries.push(entry);
};

export const newPatient = (entry: NewPatient): Patient => {
    const id: string = uuid();
    const new_patient: Patient = {id, ... entry};
    patients.push(new_patient);
    return new_patient;
};

export const newHospitalEntry = (entry: Omit<HospitalEntry, 'id'>): Entry => {
    const id: string = uuid();
    const new_entry: Entry = {id, ... entry};
    return new_entry;
};

export const newHealthcheckEntry = (entry: Omit<HealthCheckEntry, 'id'>): Entry => {
    const id: string = uuid();
    const new_entry: Entry = {id, ... entry};
    return new_entry;
};

export const newOccupationalEntry = (entry: Omit<OccupationalHealthcareEntry, 'id'>): Entry => {
    const id: string = uuid();
    const new_entry: Entry = {id, ... entry};
    return new_entry;
};

export const getPatient = (id: string): Patient | undefined => {
    return patients.find(patient=>patient.id===id);
};