import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountriesList from './components/CountriesList.js';
import CountryDisplay from './components/CountryDisplay.js';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredCountries = filter === '' ? [] : countries.filter(country => {
    return country.name.official.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} /><br />
      {filteredCountries.length > 10 ? "Too many matches, specify another filter" :
        filteredCountries.length > 1 ? <CountriesList countries={filteredCountries} /> :
          filteredCountries.length === 1 ? <CountryDisplay country={filteredCountries[0]} /> :
            filter.length > 1 && filteredCountries.length === 0 ? "No match found" : ""
      }
    </div>
  )
}

export default App;
