import React, { Fragment } from 'react';
import { useState } from 'react'

const Filter = ({ handleFilterChange, filterQuery }) => {
  return (<div>
    filter shown with <input onChange={handleFilterChange} value={filterQuery} />
  </div>)
}


const Persons = ({ personsList }) => {
  return (
    <div>
      {personsList.map(person => <Fragment key={person.id}>{person.name} {person.number}<br /></Fragment>)}
    </div>
  )
}

const PersonForm = ({ handleFormSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {

  return (<form onSubmit={handleFormSubmit}>
    <div>
      name: <input onChange={handleNameChange} value={newName} />
    </div>
    <div>
      number: <input onChange={handleNumberChange} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterQuery(event.target.value);


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const foundPerson = persons.find((person, index) => {
      return person.name === newPerson.name
    });

    if (foundPerson !== undefined) {
      alert(`${foundPerson.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const personsList = filterQuery === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(filterQuery.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filterQuery={filterQuery} />
      <h3>Add a new</h3>
      <PersonForm handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons personsList={personsList} />
    </div>
  )
}

export default App