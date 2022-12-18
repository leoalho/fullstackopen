import { Entry } from "../types";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";


const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
    switch (entry.type){
    case "Hospital":
        return <HospitalEntry entry={entry}/>;
    case "HealthCheck":
        return <HealthCheckEntry entry={entry}/>;
    case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry}/>;
    default:
        return <div></div>;
    }
    };

export default EntryDetails;