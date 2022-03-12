import React from "react";
import { CoursePart } from "../types";


type Courses = CoursePart[]

const Total = ({ Courses }: {Courses: Courses}) => (
    <p>
      Exercises in total{" "}
      { Courses.reduce((c, p) => c + p.exerciseCount, 0) }
    </p>
  );
  
export default Total;