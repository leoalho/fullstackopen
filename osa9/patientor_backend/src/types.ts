export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface discharge {
    date: string;
    criteria: string;
}

interface sickLeave {
    startDate: string;
    endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    sickLeave?: sickLeave;
    employerName: string;
}

export type Entry =
  | HospitalEntry 
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;

export type HospitalEntryFields = {
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnose['code']>,
    type: string,
    discharge: discharge
    sickLeave?: string,
    employerName?: string;
};

export type HealthCheckEntryFields = {
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnose['code']>,
    type: string,
    healthCheckRating: HealthCheckRating;
};

export type OccupationEntryFields = {
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: Array<Diagnose['code']>,
    type: string,
    sickLeave: sickLeave,
    employerName: string;
};

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string,
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

export type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

export enum Gender {
    Male = 'male',
    Female = 'female'
}