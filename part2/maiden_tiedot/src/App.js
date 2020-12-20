import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'


const App = () => {
  const [ filter, setFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  const url = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    axios
        .get(url)
        .then(response => {
            setCountries(response.data)
        })
  }, [])

    const filteredCountries = (filter.length > 0) ? countries.filter(country => country.name.match(new RegExp(filter, 'gi'))) : countries

    const result = () => {
      if (filteredCountries.length >10) {
        return <p>Over 10 results, try to specify your search</p>
      }
      else if (filteredCountries.length === 1) {
        return <Country country = {filteredCountries[0]}/>
      }
      else {
        return <Countries countries = {filteredCountries} setFilter = {setFilter}/>
      }
    }

    return (
      <div>
          <h1>Search</h1>
          <Filter setFilter={setFilter} filter={filter}/>
          {result()}
      </div>
  )
}

export default App
