import { NewPatient, Fields, Gender, NewHospitalEntry, NewHealthCheckEntry, NewOccupationalEntry, HospitalEntryFields,
    HealthCheckEntryFields, OccupationEntryFields } from "./types";

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: []
    };
    return newPatient;
};

export const toNewHospitalEntry = (entry: HospitalEntryFields): NewHospitalEntry => {
    const newHospitalEntry: NewHospitalEntry = {
        description: parseString(entry.description),
        date: parseString(entry.date),
        specialist: parseString(entry.specialist),
        type: "Hospital",
        diagnosisCodes: entry.diagnosisCodes,
        discharge: entry.discharge
    };

    return newHospitalEntry;
};

export const toNewOcupationalEntry = (entry: OccupationEntryFields): NewOccupationalEntry => {
    const newEntry: NewOccupationalEntry = {
        description: parseString(entry.description),
        date: parseString(entry.date),
        specialist: parseString(entry.specialist),
        type: "OccupationalHealthcare",
        diagnosisCodes: entry.diagnosisCodes,
        employerName: parseString(entry.employerName),
        sickLeave: entry.sickLeave,
    };

    return newEntry;
};

export const toNewHealthcheckEntry = (entry: HealthCheckEntryFields): NewHealthCheckEntry => {
    const newEntry: NewHealthCheckEntry = {
        description: parseString(entry.description),
        date: parseString(entry.date),
        specialist: parseString(entry.specialist),
        type: "HealthCheck",
        diagnosisCodes: entry.diagnosisCodes,
        healthCheckRating: entry.healthCheckRating
    };

    return newEntry;
};

const parseString = (name: unknown): string => {
    if (!name || !isString(name)){
        throw new Error('Incorrect or missing value');
    }

    return name;
};

const parseGender = (gender: unknown): string => {
    if (!gender || !isGender(gender)){
        throw new Error('Incorrect or missing value for gender');
    }

    return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};
