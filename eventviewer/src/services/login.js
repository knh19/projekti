import axios from 'axios'

const baseUrl = 'http://localhost:3001/api'

const login = async (username, password) => {
  const response = await axios.post(`${baseUrl}/login`, {
    username,
    password
  })

  return response.data
}

const register = async (username, password, name) => {
  const response = await axios.post(`${baseUrl}/users`, {
    username,
    password,
    name
  })

  return response.data
}

export default { login, register }