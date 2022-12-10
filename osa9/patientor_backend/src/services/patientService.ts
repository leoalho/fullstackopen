import patientData from '../../data/patients.json';
import { PatientList } from '../types';

export const getEntries = (): Array<PatientList> => {
    return patientData
}

export const getNonSensitiveEntries = (): Omit<PatientList, 'ssn'>[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => {
        return {id, name, dateOfBirth, gender, occupation}
    })
}