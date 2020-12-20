import React, { useReducer } from 'react'


const Header = (props) => {
  return (
    <div>
      <p>{props.course.name}</p>
    </div> )
}

const Part = (props) => {
  return (
    <div>
    <p>{props.part.name} {props.part.exercises}</p>
  </div> 
  )
}

const Content = (props) => {

  const course_parts = props.course.parts
  
  const exercises = course_parts.map(part => part.exercises)

  const sum_of_exercises = (accumulator, currentValue) => accumulator + currentValue

  return (
    <div>
      <div>
        {course_parts.map(part =>
          <div style = {{marginBottom: '1rem'}} key={part.id}>
            <Part part = {part} />
          </div>
        )}
      </div>
      <div style = {{fontWeight: 'bold'}}>
        Total of {exercises.reduce(sum_of_exercises)} exercises 
      </div>
    </div> 
  ) 
}


const Course = (props) => {
  return (
    <div>
      <div style={{fontSize: 30, fontWeight: 'bold', marginTop:'1rem',  marginBottom: '1rem'}}>
        <Header course = {props.course}/>    
      </div>
        <Content course = {props.course}/>
    </div>
  )
}

export default Course