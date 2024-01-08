import { useState, useEffect } from 'react'
import personService from './services/persons'

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

  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const submitPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    }
    // should never be more than 1
    let dupePersons = persons.filter((person)=>person.name===newName);
    // prevent same name from being added
    if (dupePersons.length){
      let dupeId = dupePersons[0].id;
      // alert(`${newName} is already added to phonebook`);
      if (confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(dupeId, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson);
            setPersons(persons.map(person=> person.id !== dupeId ? person : returnedPerson));
            // reset form input fields
            setNewName('');
            setNewNumber('');
          })
      }
      return;
    }

    // alter to modify our server data db.json
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        // reset form input fields
        setNewName('');
        setNewNumber('');
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
    // return <Person name="bob" number="123" />;
  }

  const getAllPersons = () => {
    return persons.map(person => {
      return <Person key={person.name} name={person.name} number={person.number} personId={person.id} deletePerson={deletePerson} />
    })
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <PersonForm submitPerson={submitPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      {/* <h2>Directory:</h2>
      <ul>
        {newFilter.length ? getFiltered() : persons.map(person => {
          return <Person key={person.name} name={person.name} number={person.number} />
        })}
      </ul> */}

      <Directory newFilter={newFilter} getFiltered={getFiltered} getAllPersons={getAllPersons} />
    </div>
  )
}

export default App