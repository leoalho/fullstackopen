import { HealthCheckEntry } from "../types";

const healthCheckEntry: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    return (
        <div>
            {entry.date} HealthCheck<br/>
            {entry.description}<br/>
            Health rating: {entry.healthCheckRating}<br/>
            diagnose by {entry.specialist}
        </div>
    );
};

export default healthCheckEntry;