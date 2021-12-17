import React, { useState, useEffect} from 'react'
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

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('') 
  // const [url, setUrl] = useState('') 
  
  const [blogs, setBlogs] = useState([])

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
      console.log(user.id, "user.id")
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(user.username + ' logged in')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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

  const createBlog = async (blogObject) => {
    addBlogRef.current.toggleVisibility()
    await blogService
    .create(blogObject)
      setNotificationMessage(`New blog: ${blogObject.title} ${blogObject.author} created`)
      blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const blogAddForm  = () => {
    return (
    <Togglable buttonText='Add Blog' ref={addBlogRef} >
      <BlogForm
        // handleBlogChange = {handleBlogChange}
        createBlog= {createBlog}
        setNotificationMessage = {setNotificationMessage}
        // title = {title}  
        // author = {author}
        // url = {url}
        // setTitle = {setTitle} 
        // setAuthor = {setAuthor}
        // setUrl = {setUrl}
        />
      </Togglable> 
    )  
}

  const likeBlog = async (id, blogObject) => {
    
    try {  
      
      console.log(id, "id in delete blog 1")
      const response =  await blogService.updateBlog(id, blogObject)
     
      console.log(response)
      console.log(id, "id in delete blog 2")
      
      const updatedBlog = {
        ...blogObject,
        id,
      }

      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      
    } catch (err) {
      console.error(err)
      setNotificationMessage({err})

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.filter((blog) => blog.id === id)

      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {
        // delete blog from db
        const response = await blogService.deleteBlog(id)
        
        console.log(response)
        // update state to reflect deletion in UI
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (err) {
      console.error(err)
      setNotificationMessage({err})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
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
          {blogAddForm()}
          { blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
            <Blog  
            key={blog.id}
            user={user}
            blog={blog}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
            />
            // <Blog 
            // key={blog.id}
            // user = { user } 
            // blog={blog}
            // notificationCallback = {setNotificationMessage} 
            // blogs = {blogs}
            // setBlogs = {setBlogs}
            // />
          ))}
          </div>}        
         </div>
    )
  }

export default App