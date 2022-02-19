const initialState = ""
  
const notificationReducer = (state = initialState, action) => {  
    console.log(action.type, "notification action type")
    switch (action.type) {      
      case "SET_NOTIFICATION":
        return action.data.message
      case "NULLIFY":
        return initialState
      default: return state
    }
  }

  
export const setNotification = ( message, delay ) => {
  console.log(message, delay, "setNotification parameters")
    return async dispatch => {
        dispatch({
          type: 'SET_NOTIFICATION', 
          data: {
              message,
          }
        })
        clearTimeout()
        setTimeout(() => {
            dispatch(nullifyNotification())
          }, delay * 1000)
    }
}


export const nullifyNotification = () => {
  return {
    type: 'NULLIFY',
  }
}


export default notificationReducer