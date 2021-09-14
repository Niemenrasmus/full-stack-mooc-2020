import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from "./components/Notification"
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"

import Togglable from './components/Togglable'


const App = () => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 
  const [notificationMessage, setNotificationMessage] = useState(null);

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')

  const addBlogRef = React.createRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => a.likes > b.likes ? -1 : 1))
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  
  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const user = await loginService({
        username, password
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotificationMessage('wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }
  

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null);
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
        user: user.id
      }
      setNotificationMessage(`New blog ${title} by ${author} was added`)
      addBlogRef.current.toggleVisibility()
      const added_blog = await blogService
        .create(blogObject)
          .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          console.log(added_blog)
        })
        setTimeout(() => {
          setNotificationMessage(null);
        }, 4000);
    }

    catch(exception) {
      setNotificationMessage('Invalid blog details');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    }  
  }

  

  const handleBlogChange = (event) => {
    console.log(event.target.value)
    setNewBlog(event.target.value)
    console.log(newBlog)
    addBlog(event)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  
  const blogForm  = () => {
    return (
    <Togglable buttonText='Add Blog' ref={addBlogRef} >
      <BlogForm
        handleBlogChange = {handleBlogChange}
        title = {title}  
        author = {author}
        url = {url}
        setTitle = {setTitle} 
        setAuthor = {setAuthor}
        setUrl = {setUrl}
        />
      </Togglable> 
    )  
}


    return (
      <div>
        <h2>Welcome to blog app</h2>
        <Notification message={notificationMessage} />
        {user === null
          ? <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
          : <div>
          <p>
          <button onClick={handleLogout}> Log Out</button> 
          </p>
          <h2>blogs</h2>
          {blogForm()}
          { blogs.map(blog =>
            <Blog 
            key={blog.id}
            user = { user } 
            blog={blog}
            notificationCallback = {setNotificationMessage} 
            blogs = {blogs}
            setBlogs = {setBlogs}
            />
          )}
          </div>}        
         </div>
    )
  }

export default App