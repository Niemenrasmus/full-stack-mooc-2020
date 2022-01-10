import React from 'react'
import { connect } from 'react-redux'

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