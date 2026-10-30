import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/events'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const register = async (eventId, token) => {
  const response = await axios.post(
    'http://localhost:3001/api/registrations',
    { eventId },
    {
      headers: {
       Authorization:`Bearer ${token}`
      }
    }
  )
  return response.data
}
export default { getAll, register } 