import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LIKE':
      return state.map(blog => 
        blog.id !== action.data.blog.id ? blog : action.data.blog)    
    case "NEW_BLOG":
      const blogToAdd = action.data
      return [...state, blogToAdd]
    case "DELETE":
      return state.filter(blog => blog.id !== action.data.id);  
    case "INIT":
      return action.data
    default: return state
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    await blogService.updateBlog(blog.id, blog)
    dispatch({
      type: "LIKE", 
      data: { blog } 
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => { 
    const blog = await blogService.create(content)
      dispatch({
        type: 'NEW_ANECDOTE',
        data: blog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => { 
    const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT',
        data: blogs,
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => { 
    await blogService.deleteBlog(id)
      dispatch({
        type: 'DELETE',
        data: {id},
    })
  }
}

export default blogReducer