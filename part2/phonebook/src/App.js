import React, { useEffect } from 'react';
import { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import phoneService from './services/phonebook'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilterQuery(event.target.value);

  useEffect(() => {
    phoneService
      .getAllPhonebook()
      .then(data => setPersons(data))
  }, [])

  const editPerson = (personId, person) => {
    phoneService.editPerson(personId, person).then(
      response => {
        setPersons(persons.map(person => {
          if (person.id === response.id) return response;
          return person;
        }));
        setNewName('');
        setNewNumber('');
      }
    )
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find((person, _) => {
      return person.name === newPerson.name
    });

    if (foundPerson !== undefined) {
      const confirm = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) editPerson(foundPerson.id, newPerson);
      return;
    }

    phoneService.addPerson(newPerson).then(
      response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      }
    );

  }

  const handleDelete = (id) => {
    phoneService.deletePerson(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
    });
  }

  const personsList = filterQuery === '' ? persons : persons.filter((person) => person.name.toLowerCase().includes(filterQuery.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} filterQuery={filterQuery} />
      <h3>Add a new</h3>
      <PersonForm handleFormSubmit={handleFormSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons personsList={personsList} handleDelete={handleDelete} />
    </div>
  )
}

export default App