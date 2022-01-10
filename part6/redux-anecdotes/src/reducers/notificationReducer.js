const initialState = ""
  
const notificationReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case "SET_NOTIFICATION":
        return action.data.message
      case "NULLIFY":
        return initialState
      default: return state
    }
  }


export const setNotification = ( message, delay ) => {
    return async dispatch => {
        dispatch({
          type: 'SET_NOTIFICATION', 
          data: {
              message,
          }
        })
        clearTimeout()
        setTimeout(() => {
            dispatch(nullifyNotification(""))
          }, delay * 1000)
    }
}


export const nullifyNotification = () => {
  return {
    type: 'NULLIFY',
  }
}


export default notificationReducer