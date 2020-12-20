import React, { useState, useEffect } from 'react'
import AddPerson from "./components/AddPerson"
import ShowPersons from "./components/Persons"
import FilterPersons from "./components/Filter"
import messages from "./components/Notification"
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  

  useEffect(() => {
    personServices
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        })

  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName, number: newNumber
    }
    
    // Check if person's name exists in persons
    if (persons.map(person=>
      person.name).includes(newName)){
        if (window.confirm(`Do you really want to replace ${person.name} with new number?`)) { 
          let old_person = persons.find(person=> person.name === newName)
          personServices
          .update(old_person.id, person)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id === old_person.id) ? returnedPerson : person))
            setNewName("")
            setNewNumber("")
            setNotificationMessage(
              `${old_person.name} was updated`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `${old_person.name} was already removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      } 
      }

    else {
      personServices
      .create(person)
      .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName("")
      setNewNumber("")
      setNotificationMessage(
        `${returnedPerson.name} was created`
      )
      setTimeout(() => {
        setNotificationMessage  (null)
      }, 5000)
    })
    } 
  }


  function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele !== value; 
    });
}

  const removePerson = (person) => {
  if (window.confirm(`Do you really want to delete ${person.name}`)) { 
      personServices. 
      remove(person.id)
      .then(returnValue => {
        setPersons(arrayRemove(persons, person))
        setNotificationMessage(
          `${person.name} was deleted`
        )
        setTimeout(() => {
          setNotificationMessage  (null)
        }, 5000)
      })
      .catch(err => {
        setErrorMessage(
          `${person.name} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setSearchInput(event.target.value)
  }

  const personsToShow = 
    persons.filter(person=>person.name.toLowerCase().includes(searchInput.toLowerCase()))
  

  return (
    <div>
      <h2>Phonebook</h2>
      <messages.Notification message={notificationMessage}/>
      <messages.Error message={errorMessage}/>
        <div>
        Search with name: 
        <FilterPersons
        searchInput = {searchInput}
        handleInputChange = {handleInputChange}/>
          <h2>Add a new</h2>
          <AddPerson 
          newNumber = {newNumber} 
          newName = {newName}
          handleNameChange = {handleNameChange}
          handleNumberChange = {handleNumberChange}
          addPerson = {addPerson}
          />
        </div>
      <h2>Numbers</h2>
        <ul>
        <ShowPersons
        personsToShow = {personsToShow}
        removePerson = {removePerson}
        />
        </ul>
    </div>
  )

}

export default App