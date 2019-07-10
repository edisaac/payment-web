import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://localhost:8090/payu`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  postDebt(debt) {
    return apiClient.post('/register/debt', debt)
  }
}
