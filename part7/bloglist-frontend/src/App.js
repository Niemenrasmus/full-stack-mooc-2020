import React, {useEffect} from 'react'
import Blog, { BlogView } from './components/Blog'
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Users, { UserView } from "./components/Users"


import { useDispatch, useSelector } from 'react-redux'

import Togglable from './components/Togglable'
import Nav from './components/Nav'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { updateBlog } from './reducers/blogReducer'
import { deleteBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

import { Switch, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const addBlogRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    }, [dispatch])

  console.log(user, "user")
  
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))  
    }
    console.log(user)
  }, [])


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
          {user === null
          ? <LoginForm/>
          :
        <> 
          <Nav/>
          <Switch>
          <Route path='/users/:id'>
            <UserView allBlogs={blogs} />
          </Route>
          <Route path='/blogs/:id'>
            <BlogView allBlogs={blogs} likeBlog = {likeBlog} />
          </Route>
          <Route path='/users' component={Users} />
          <Route path='/blogs'>

          <h2>blogs</h2>
          {blogAddForm()}
          <table >
            <tbody>
                <tr>
                    <th>Blog Name</th>
                </tr>
                { blogs
                        .sort((a, b) => b.likes - a.likes)
                        .map((blog) => (
                      <tr key={blog.id}>
                        <Blog  
                        key={blog.id}
                        blog={blog} 
                        />
                        </tr>
                      ))}
            </tbody>
        </table>        
          </Route>        
      </Switch>
      </>
      }
      </div>
    )
  }

export default App