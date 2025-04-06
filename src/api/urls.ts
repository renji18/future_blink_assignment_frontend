import axios from "axios"

export const urls = {
  register: "/register",
  login: "/login",
  profile: "/profile",
  logout: "/logout",
  flow: "/flow",
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export default apiClient
