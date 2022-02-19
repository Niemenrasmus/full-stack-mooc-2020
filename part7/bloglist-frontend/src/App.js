import React, { useState, useEffect} from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Users from "./components/Users"

import { useDispatch, useSelector } from 'react-redux'

import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { updateBlog } from './reducers/blogReducer'
import { deleteBlog } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const addBlogRef = React.createRef();

  useEffect(() => {
    dispatch(initializeBlogs())
    }, [dispatch])

  console.log(user, "user")
  
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))  
    }
  }, []);
  
  
  const handleLogout = async () => {
    window.localStorage.clear()
    dispatch(logoutUser())
    console.log(user)
  }

  const blogAddForm  = () => {
    return (
    <Togglable buttonText='Add Blog' ref={addBlogRef} >
      <BlogForm/>
      </Togglable> 
    )  
}

  const likeBlog = async (blogObject) => {
    try {  
      await dispatch(updateBlog(blogObject))
      dispatch(setNotification("Liked blog " + blogObject.title, 5))
    }
    catch (err) {
      console.error(err)
      dispatch(setNotification(err, 5))
    }
  }

  const removeBlog = async (id) => {
    try {  
      await dispatch(deleteBlog(id))
      dispatch(setNotification("Deleted blog ", 5))
    }
    catch (err) {
      console.error(err)
      dispatch(setNotification(err, 5))
    }
  
  }

    return (
      <div>
        <h2>Welcome to blog app</h2>
        <Notification/>
          {user === null
          ? <LoginForm/>
          : <div>
          <p>
          <button onClick={handleLogout}> Log Out</button> 
          </p>
          <h2>blogs</h2>
          {blogAddForm()}
          { blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
            <Blog  
            key={blog.id}
            user={user}
            blog={blog} 
            likeBlog={likeBlog}
            deleteBlog={removeBlog}
            />
          ))}
          <Users/> 
          </div>}        
         </div>
    )
  }

export default App