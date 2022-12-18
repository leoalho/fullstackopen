import { Entry } from "../types";

const HospitalEntry: React.FC<{entry: Entry}> = ({entry}) => {
    return (
        <div>
            {entry.date} hospital<br/>
            {entry.description}<br/>
            diagnose by {entry.specialist}
        </div>
    );
};

export default HospitalEntry;