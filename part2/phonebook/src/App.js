import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterQuery(event.target.value);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }, [])


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