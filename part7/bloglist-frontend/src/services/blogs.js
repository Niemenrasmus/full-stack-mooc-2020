import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null;

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const updateBlog = async (id, updatedContents) => {
  // console.log(typeof(updatedContents))

  try {
    console.log(`${baseUrl}/${id}`)
    const response = await axios.put(`${baseUrl}/${id}`, updatedContents)
    console.log(response)
    return response

  } catch (exception) {
    console.log(exception)
    return { error : exception.message }
  }
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  try {
    console.log(`${baseUrl}/${id}`)
    const response = await axios.delete(`${baseUrl}/${id}`)
    console.log(response)
    return response
  } catch (exception) {
    return { error : exception.message }
  }
}

const exportedObject = {
  getAll,
  setToken,
  create,
  updateBlog,
  deleteBlog
};

export default exportedObject