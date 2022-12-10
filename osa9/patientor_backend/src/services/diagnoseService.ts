import diagnoseData from '../../data/diagnoses.json';
import { DiagnoseList } from '../types';

export const getEntries = (): Array<DiagnoseList> => {
    return diagnoseData
}