import { Entry } from "../types";

const OccupationalHealthcareEntry: React.FC<{entry: Entry}> = ({entry}) => {
    return (
        <div>
            {entry.date} Occupational HealthCheck<br/>
            {entry.description}<br/>
            diagnose by {entry.specialist}
        </div>
    );
};

export default OccupationalHealthcareEntry;