import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({ country }) => {
    const [ weather, setWeather ] = useState('')
    const [ done, setDone ] = useState(false)

    const api = `http://api.apixu.com/v1/current.json?key=8cf218ec6d37418794082009192203&q=${country.capital}`

    useEffect(() => {
        axios
            .get(api)
            .then(response => {
                setWeather(response.data)
                setDone(true)
            })
    }, [country])

    const imgStyle = {
        height: 'auto',
        width: '200px'
    }
    
    const mapP = () => country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)

    return (
        <div>
            <h2>{country.name}</h2>   
            <ul>
                <li>Capital: {country.capital}</li>
                <li>Population: {country.population}</li>
            </ul>
            <h3>Languages</h3>
            <ul>
                {mapP()}
            </ul>
            <img style={imgStyle} alt={`${country.name} flag `} src={country.flag} />
            <Weather isDone={done} weather={weather} />
        </div>
    )
}

export default Country