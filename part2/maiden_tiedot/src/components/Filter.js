
import React from 'react'

const Filter = ({setFilter, filter}) => {
    return (
        <div>
            search: <input onChange={(evt) => setFilter(evt.target.value)} value={filter}/>
        </div>
    )
}

export default Filter