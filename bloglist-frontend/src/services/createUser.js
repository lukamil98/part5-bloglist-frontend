import axios from "axios"
const baseUrl = "/api/users" // Endpoint for creating users

const createUser = async (userData) => {
  const response = await axios.post(baseUrl, userData)
  return response.data
}

export default { createUser }
