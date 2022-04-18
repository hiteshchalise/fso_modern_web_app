import React, { useState } from "react";
import CountryDisplay from "./CountryDisplay";

const CountriesList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState({});

  const showClicked = (country) => {
    setSelectedCountry(country);
  }
  return <div>
    {
      countries.map(
        country => (
          <div key={country.area}>
            {country.name.common} <button onClick={() => showClicked(country)}>show</button>
          </div>
        )
      )
    }
    {Object.keys(selectedCountry).length !== 0 ? <CountryDisplay country={selectedCountry} /> : ""}
  </div>
}


export default CountriesList;