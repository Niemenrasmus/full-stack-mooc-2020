import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const notificationReducer = (state = null, action) => {  
    console.log(action.type, "notification action type")
    switch (action.type) {      
      case "LOGIN":
        window.localStorage.setItem('loggedUser', JSON.stringify(action.user))
        blogService.setToken(action.user.token)
        return action.user
      case "SET_USER":
        return action.user
      default: return state
    }
  }

  
export const loginUser = ( username, password ) => {
    return async dispatch => {
        try {
            const user = await loginService.loginService({
               username, password
            })
            console.log(user, "user")
            dispatch({
                type: "LOGIN",
                user
            })
            dispatch(setNotification(user.username + ' logged in', 5))
        } 
        catch (exception) {
            console.log(exception)
            dispatch(setNotification('wrong credentials', 5))
        }
    }
}

export const setUser = (user) => {
    return async dispatch => {
        blogService.setToken(user.token);
        dispatch({
            type: 'SET_USER',
            user
        });
    };
}


export default notificationReducer