import React from 'react'

const ShowPersons = (props) => {
    return (
    props.personsToShow.map(person =>
      <li key = {person.name}> {person.name} {person.number} 
        <button onClick={ () => props.removePerson(person) }>
            delete
        </button>
      </li>
    )
)
}
    
export default ShowPersons