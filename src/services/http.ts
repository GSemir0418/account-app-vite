import axios from 'axios'
import { router } from '@/router/router'

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
    if (error.response.status === 401)
      router.navigate('/sign-in')

    return Promise.reject(error)
  },
)

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt')
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
)
export default http
