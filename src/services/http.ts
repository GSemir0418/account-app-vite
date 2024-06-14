import axios from 'axios'

const http = axios.create({
  // baseURL: "http://localhost:8080/api/v1",
  baseURL: import.meta.env.VITE_ENV === 'development' ? import.meta.env.VITE_API_BASE_URL : `${window.location.origin}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
  response => response,
  (error) => {
    return Promise.reject(error)
  },
)

export default http
