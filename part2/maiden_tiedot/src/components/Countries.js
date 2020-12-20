import React from 'react'

const Countries = ({countries, setFilter}) => {
    const country = (count) => {
        setFilter(count.target.value)
    }

    const countryList = countries.map(count => <li key={count.alpha3Code}>{count.name} <button onClick={country} value={count.name}>show</button></li>)
    
    return (
        <ul>
            {countryList}
        </ul>
    )
}

export default Countries