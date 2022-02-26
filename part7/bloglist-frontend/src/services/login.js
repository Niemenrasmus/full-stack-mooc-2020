import axios from 'axios'
const baseUrl = '/api/login'

const loginService = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const getAllUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

export default { loginService, getAllUsers }
