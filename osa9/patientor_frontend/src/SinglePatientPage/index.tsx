import axios from "axios";
import React from "react";
import { useStateValue, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Entry, Patient } from "../types";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
//import { addPatient } from "../state";

import EntryDetails from "./EntryDetails";
import { Button } from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";

const SinglePatientPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const {id} = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    
    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          if (id){
            await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values);
            const patient: Patient | undefined = Object.values(patients).find(patient => patient.id === id);
            if (patient) {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(updatePatient(patient));
            }
            closeModal();
          }
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };

    React.useEffect(() => {
        const patient: Patient | undefined = Object.values(patients).find(patient => patient.id === id);
        if (patient && 'ssh' in patient){
            return;
        }
        const fetchPatient = async () => {
            if (patient && id) {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(updatePatient(patient));
            }
        };
      
      void fetchPatient();
    }, [dispatch]);

    if (id){
        console.log(Object.values(patients));
        const patient: Patient | undefined = Object.values(patients).find(patient => patient.id === id);
        console.log(patient);
        if (patient){
            return (
                <div>
                    <h2>{patient.name}</h2>
                    gender: {patient.gender}<br />
                    ssh: {patient.ssn}<br />
                    occupation: {patient.occupation}
                    <h3>entries</h3>
                    <div>
                        {patient.entries.map((entry: Entry) => (<div key={entry.id} style={{padding: "5px", marginTop: "10px", borderStyle:"solid"}}><EntryDetails entry={entry}/></div>))}
                    </div>
                    <Button style={{marginTop: "10px"}} variant="contained" color="primary" onClick={() => openModal()} >
                        ADD NEW HOSPITAL ENTRY
                    </Button>
                    <AddEntryModal
                        modalOpen={modalOpen}
                        onSubmit={submitNewEntry}
                        error={error}
                        onClose={closeModal}
                    />
                </div>);
        }   
    }
    return (
        <div>
            Invalid id
        </div>
    );
    
};

export default SinglePatientPage;