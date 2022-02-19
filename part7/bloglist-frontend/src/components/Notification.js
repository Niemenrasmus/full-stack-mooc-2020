import React from 'react'
import { connect } from 'react-redux'

// const Notification = ({ message }) => {
//   if (message === null) {
//     return null
//   }

//   return (
//     <div className="notification">
//       {message}
//     </div>
//   )
// }

// Notification.propTypes = {
//   notification: PropTypes.string
// };

// export default Notification


const Notification = ({notification}) => {

  const style = {
    border: 'solid', 
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const stateToProps = (state) => {
  return {
    notification: state.notification
  } 
} 

const ConnectedNotification = connect(stateToProps)(Notification)

export default ConnectedNotification