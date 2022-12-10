export interface DiagnoseList {
    code: string,
    name: string,
    latin?: string
}

export interface PatientList {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
}