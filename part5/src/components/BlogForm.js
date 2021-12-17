import React, { useState } from 'react'


const BlogForm = ({ createBlog, setNotificationMessage}) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    

    const titleChange = (value) => {
        setTitle(value)
    }

    const authorChange = (value) => {
        setAuthor(value)
    }

    const urlChange = (value) => {
        setUrl(value)
    }

    const handleBlogChange = async (event) => {
        event.preventDefault()
        try {
            const blogObject =  { title, author, url }
            createBlog(blogObject)
        
            setTitle('')
            setAuthor('')
            setUrl('')

            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        } catch (exception) {
            setNotificationMessage("Invalid syntax")
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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

// const BlogForm = ({handleBlogChange}) => {
//     const [title, setTitle] = useState("")
//     const [author, setAuthor] = useState("")
//     const [url, setUrl] = useState("")


//     const titleChange = (value) => {
//         setTitle(value)
//     }

//     const authorChange = (value) => {
//         setAuthor(value)
//     }

//     const urlChange = (value) => {
//         setUrl(value)
//     }


//     return (
//         <form onSubmit={handleBlogChange}>
//             <div>
//             title:
//                 <input
//                 id = "title"
//                 type="text"
//                 value={title}
//                 name="title"
//                 onChange={({ target }) => titleChange(target.value)}
//             />
//             </div>
//             <div>
//             author:
//                 <input
//                 id = "author"
//                 type="text"
//                 value={author}
//                 name="author"
//                 onChange={({ target }) => authorChange(target.value)}
//             />
//             </div>
//             <div>
//             url:
//                 <input
//                 id = "url"
//                 type="text"
//                 value={url}
//                 name="url"
//                 onChange={({ target }) => urlChange(target.value)}
//             />
//             </div>
//             <button type="submit">add blog</button>
//         </form>
//         )
//     }

export default BlogForm
