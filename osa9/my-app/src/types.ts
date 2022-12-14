
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface DescriptionPart extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends DescriptionPart {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends DescriptionPart {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface RequirementPart extends DescriptionPart {
    type: "special";
    requirements: string[];
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | RequirementPart;

export interface CourseParts {
    courseParts: CoursePart[]
}