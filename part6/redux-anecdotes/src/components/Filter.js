import React from 'react'
// import { useDispatch } from 'react-redux'

// const Filter = () => {
  
//   const dispatch = useDispatch()
//   const handleChange = (event) => {
//         dispatch(setFilter(event.target.value))
//     }

//   const style = {
//     marginBottom: 10
//   }

//   return (
//     <div style={style}>
//       filter <input onChange={handleChange} />
//     </div>
//   )
// }

// export default Filter

import { connect } from 'react-redux'
import { filter } from "../reducers/filterReducer"

const Filter = ({ filter }) => {
  const handleChange = (event) => {
    const value = event.target.value
    filter(value)
 }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(null, { filter })(Filter)
export default ConnectedFilter