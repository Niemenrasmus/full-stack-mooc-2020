import React from 'react'
import ReactDOM from 'react-dom'
import Course from './content'

const App = ({courses}) => {
  return (
    <div>
      {courses.map(course =>
      <div key = {course.id}>
        <Course course={course}/>
      </div>
  )}
  </div>
  )
}

export default App;
