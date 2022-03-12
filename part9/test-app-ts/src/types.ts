interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string
  }
  
  export interface CoursePartBaseAndDesc extends CoursePartBase {
    description: string;
  }
  
  interface CoursePartOne extends CoursePartBaseAndDesc {
    type: "normal"
  }
  
  interface CoursePartTwo extends CoursePartBase {
    groupProjectCount: number;
    type: "groupProject"
  }
  
  interface CoursePartThree extends CoursePartBaseAndDesc {
    exerciseSubmissionLink: string;
    type: "submission"
  }
  interface CoursePartFour extends CoursePartBaseAndDesc {
    requirements: Array<string>;
    type: "special"
  }

  export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;