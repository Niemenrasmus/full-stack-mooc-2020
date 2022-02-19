import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'


const BlogForm = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const dispatch = useDispatch()

    const titleChange = (value) => {
        setTitle(value)
    }

    const authorChange = (value) => {
        setAuthor(value)
    }

    const urlChange = (value) => {
        setUrl(value)
    }
    
    
    const addBlog = async (blogObject) => {
        await dispatch(createBlog(blogObject))
        dispatch(initializeBlogs()) 
        dispatch(setNotification(`New blog: ${blogObject.title} ${blogObject.author} created`, 5))     
      }
    

    const handleBlogChange = async (event) => {
        event.preventDefault()
        try {
            const blogObject =  { title, author, url }
            addBlog(blogObject)
            
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            dispatch(setNotification("Invalid syntax", 5))
        }
      }

        return (
        <form onSubmit={handleBlogChange}>
            <div>
            title:
                <input
                id = "title"
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => titleChange(target.value)}
            />
            </div>
            <div>
            author:
                <input
                id = "author"
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => authorChange(target.value)}
            />
            </div>
            <div>
            url:
                <input
                id = "url"
                type="text"
                value={url}
                name="url"
                onChange={({ target }) => urlChange(target.value)}
            />
            </div>
            <button type="submit">add blog</button>
        </form>
        )
    }

export default BlogForm