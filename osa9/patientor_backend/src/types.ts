export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Entry {

}

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