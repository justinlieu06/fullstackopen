import { useState } from 'react'
import Person from "./components/Person"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const submitPerson = (event) => {
    console.log('submit person');
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    }
    // prevent same name from being added
    if (persons.filter((person)=>person.name===newName).length){
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName('');
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const getFiltered = () => {
    // if filter longer than persons length, there is no match
    // find person(s) where the beginning of their name matches the filter length
    let matches = persons.filter((person)=>newFilter.length<= person.name.length && person.name.slice(0,newFilter.length).toLowerCase()===newFilter.toLowerCase());

    return matches.map(person => {
      return <Person key={person.name} name={person.name} number={person.number} />
    })
    // return <Person name="bob" number="123" />;
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Submit New Entry:</h2>
      <form onSubmit={submitPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Filter Directory (By Name)</h2>
      <div>
        name: <input value={newFilter} onChange={handleFilterChange} />
      </div>

      <h2>Directory:</h2>
      <ul>
        {newFilter.length ? getFiltered() : persons.map(person => {
          return <Person key={person.name} name={person.name} number={person.number} />
        })}
      </ul>
    </div>
  )
}

export default App