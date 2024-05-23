import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})
  
http.interceptors.response.use(
  response => response,
  error => {
    alert(error)
    return Promise.reject(error)
  }
)

export default http