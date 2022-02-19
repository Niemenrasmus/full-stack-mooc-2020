import React from 'react'


const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const handleLike = () => {
    const { author, url, title } = blog

    const updatedBlog = 
    {
      id: blog.id,
      user: blog.user?.id || blog.user,
      likes: blog.likes + 1,  
      author: author,
      title: title,
      url: url
    }
    // console.log(id ,updatedBlog)
    likeBlog(updatedBlog)
  }

  const handleDelete = () => {
    const id = blog.id
    console.log(id)
    deleteBlog(id)
  }

  return (
  <div>
    {blog.title} {blog.author} {blog.url} {blog.likes} <button onClick={handleLike}>Like</button> <button onClick={handleDelete}>Delete</button>
  </div>  
  )
}

export default Blog