import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

import Notification from "./components/Notification"
import Error from "./components/Error"
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Directory from "./components/Directory"

const App = () => {
  // fetch initial state of persons from server w/ axios library
  const [persons, setPersons] = useState([]);

  const hook = ()=> {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons=> {
        setPersons(initialPersons);
      }, [])
  }
  useEffect(hook, []);

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const clearForm = () => {
    setNewName('');
    setNewNumber('');
  }

  const updatePerson = (dupeId) => {
    if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      personService
        .update(dupeId, personObject)
        .then(returnedPerson => {
          console.log(returnedPerson);
          setPersons(persons.map(person=> person.id !== dupeId ? person : returnedPerson));
          // notify upon successful submission
          setNotificationMessage(`${newName}'s info has been updated`);
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000);
          clearForm();
        })
        .catch(error=>{
          setPersons(persons.filter(p=>p.id !== dupeId))
          setErrorMessage(`Error: Information of ${newName} has already been removed from server. Try refreshing the page.`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000);
        })
    }
  }

  const submitPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    let dupePerson = persons.find((person)=>person.name===newName);
    if (dupePerson){
      updatePerson(dupePerson.id);
      return;
    }

    // alter to modify our server data db.json
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        // notify upon successful submission
        setNotificationMessage(`${newName}'s info has been added`);
            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000);
        clearForm();
      })
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  // delete person with specified id
  const deletePerson = (personId, personName) => {
    if (confirm(`Delete contact for ${personName}?`)) {
      console.log(`deleting person with id of ${personId}`);
      personService
      .deletePerson(personId)
      .then(returnedPerson => {
        console.log(returnedPerson);
        setPersons(persons.filter(person=>person.id!==personId))
      })
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const getFiltered = () => {
    // if filter longer than persons length, there is no match
    // find person(s) where the beginning of their name matches the filter length
    let matches = persons.filter((person)=>newFilter.length<= person.name.length && person.name.slice(0,newFilter.length).toLowerCase()===newFilter.toLowerCase());

    return matches.map(person => {
      return <Person key={person.name} name={person.name} number={person.number} personId={person.id} deletePerson={deletePerson} />
    })
  }

  const getAllPersons = () => {
    return persons.map(person => {
      return <Person key={person.name} name={person.name} number={person.number} personId={person.id} deletePerson={deletePerson} />
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <PersonForm submitPerson={submitPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Directory newFilter={newFilter} getFiltered={getFiltered} getAllPersons={getAllPersons} />
    </div>
  )
}

export default App