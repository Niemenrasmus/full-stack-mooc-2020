import React from 'react'

const FilterPersons = (props) => {
    return ( 
      <input value = {props.searchInput}
      onChange = {props.handleInputChange}/>
    )
}

export default FilterPersons