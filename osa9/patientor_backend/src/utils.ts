import { NewPatient, Fields, Gender } from "./types";

export const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation)
    };
    return newPatient;
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
