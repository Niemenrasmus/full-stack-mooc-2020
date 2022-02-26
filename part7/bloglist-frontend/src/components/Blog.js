import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TableCell } from '@material-ui/core'
import blogService from '../services/blogs'
import { Input, Button } from '@material-ui/core'

export const BlogView = ({ allBlogs, likeBlog }) => {
    const [comments, setComments] = useState([])
    const id = useParams().id
    const blog = allBlogs.find(b => b.id === id)

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
      likeBlog(updatedBlog)
    }

    const getBlogComments = async (id) => {
      const comments = await blogService.getComments(id)
      setComments(comments) 
    }

    useEffect(() => {
      getBlogComments(id)
      }, [])

    const giveComment = async (event) => {
      event.preventDefault()
      const body = event.target.comment.value
      event.target.comment.value = ''
      const comment = {
        'body': body,
      }
      const addedComment = await blogService.addComment(id, comment)
      setComments(comments.concat(addedComment))
    }
    
    return (
    <div>
      <div>
      <h2>{blog.title}</h2>
      <div>
      {blog.url}
      </div>
      </div>
      <div>  
      added by {blog.user.username} 
      </div>
      <div>
      {blog.likes} <button onClick={handleLike}>Like</button>
      </div>
      <h2>comments</h2>
      {comments !== null && 
          <ul>{
              comments.map(comment => {
                  return <li key={comment.id}>{comment.body}</li>
              })}
          </ul>
      }
      <form onSubmit={giveComment}>
      <Input name='comment' /> <Button type='submit'>give comment</Button>
      </form>

    </div>  
    )
  }

const Blog = ({ blog }) => {

  return (
    <TableCell>
      <Link to={`/blogs/${blog.id}`}>
      {blog.title}
      </Link>
    </TableCell>
  )
}

export default Blog