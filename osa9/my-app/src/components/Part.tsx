import { CoursePart } from "../types"

interface PartProps {
    coursePart: CoursePart
}

const Part = (props: PartProps) => {
    const coursePart = props.coursePart
    switch (coursePart.type) {
        case "normal":
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    <i>{coursePart.description}</i>
                </p>
            )
        case "groupProject":
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    Project exercises {coursePart.groupProjectCount}                
                </p>
            )
        case "special":
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    <i>{coursePart.description}</i><br />
                    required skills: {coursePart.requirements.join(', ')}
                </p>
            )
        case "submission":
            return (
                <p>
                    <b>{coursePart.name} {coursePart.exerciseCount}</b><br/>
                    <i>{coursePart.description}</i><br/>
                    submit to {coursePart.exerciseSubmissionLink}
                </p>
            )
        default:
            return <></>
    }
}

export default Part