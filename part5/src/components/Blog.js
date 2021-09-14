import React from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, notificationCallback, setBlogs, blogs}) => {
  
  const handleLike = async () => {
    try {
      const updatedContents = { author : blog.author, url : blog.url, user : blog.user.id, likes : blog.likes + 1 }
      const response = await blogService.updateBlog({ id : blog.id, updatedContents })
      let blogList = blogs.map(b => b.id !== updatedContents.id ? b : updatedContents);
      setBlogs(blogList);
      if (response.error) {
        notificationCallback
        ("response-error " + response.error)
        setTimeout(() => {
          notificationCallback(null)
        }, 5000)
      } else {
        notificationCallback(`Liked ${blog.title} by ${blog.author}!` )
        setTimeout(() => {
          notificationCallback(null)
        }, 5000)
      }
    } catch (exception) {
      notificationCallback("expetion: " + exception.message )
      setTimeout(() => {
        notificationCallback(null)
      }, 5000)
    }
    // window.location.reload();
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const response = await blogService.deleteBlog({ id : blog.id })
      if (response.error) {
        notificationCallback("response-error " + response.error)
      } else {
        notificationCallback(`Deleted ${blog.title}`)
      }
    }
  }

  return (
  <div>
    {blog.title} {blog.author} {blog.url} {blog.likes} <button onClick={handleLike}>Like</button> <button onClick={deleteBlog}>Delete</button>
  </div>  
  )
}

export default Blog