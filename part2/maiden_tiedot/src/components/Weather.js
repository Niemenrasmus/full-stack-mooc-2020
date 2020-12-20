import React from 'react'

const Weather = ({ weather, isDone }) => {

    const weatherImg = {
        height: '75px',
        width: 'auto'
    }

    if (isDone) {
        return (
            <>
                <h3>Weather in {weather.location.name}</h3>
                <p><b>temperature:</b> {weather.current.temp_c} &#161; C</p>
                <p><b>feels like:</b> {weather.current.feelslike_c} &#161; C</p>
                <img style={weatherImg} src={weather.current.condition.icon} alt={`weather condition in ${weather.location.name}`} />
                <p><b>wind:</b> {weather.current.wind_kph} km/h in direction {weather.current.wind_dir}</p>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

export default Weather