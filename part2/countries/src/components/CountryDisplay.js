import axios from "axios";
import React, { useEffect, useState } from "react";

const kelvinToCelsius = (kelvin) => {
    return Math.round((kelvin - 273.15) * 100) / 100;
}

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});
    const key = process.env.REACT_APP_WEATHER_API_KEY;

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${key}`)
            .then(response => {
                console.log(response);
                const newWeather = {
                    temp: kelvinToCelsius(response.data.main.temp),
                    icon: response.data.weather[0].icon,
                    description: response.data.weather[0].description,
                    wind: response.data.wind.speed
                }
                setWeather(newWeather);
            })
    }, [country])

    if (Object.keys(weather).length === 0) return <div></div>;

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <div>temperature {weather.temp} celsius</div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />
            </div>
            <div>wind {weather.wind} m/s</div>
        </div>
    )
}

const CountryDisplay = ({ country }) => {
    const languages = Object.keys(country.languages).map(
        index => <li key={country.languages[index]} >{country.languages[index]}</li>
    );
    return (
        <div>
            <h1>{country.name.common}</h1> <br />
            capital {country.capital[0]} <br />
            area {country.area}
            <h2>languages:</h2>
            <ul>
                {languages}
            </ul>
            {country.flag}
            <Weather country={country} />
        </div>
    )
}

export default CountryDisplay;