import React from 'react';
import { CoursePart } from '../types';

const Part = ({course}: {course: CoursePart}) => {

    switch (course.type) {
        case "normal":
            return <div>
            <div><b>{course.name}</b>: {course.exerciseCount} exercises </div>
            <i>{course.description}</i>
            </div>;

        case "groupProject":
            return <div>
            <div><b>{course.name}</b>: {course.exerciseCount} exercises</div>
            <div>num of projects: {course.groupProjectCount}</div>
            </div>;

        case "submission":
            return <div>
            <div><b>{course.name}</b>: {course.exerciseCount} exercises</div>
            <div><i>{course.description}</i></div>
            <div>Submit link {course.exerciseSubmissionLink}</div>
            </div>;

        case "special":
            return <div>
            <div><b>{course.name}</b>: {course.exerciseCount} exercises</div>
            <div><i>{course.description}</i></div>
            <div>Required skills: {course.requirements.toString()}</div>
            </div>;

        default: 
            return null;


    }
}

export default Part;