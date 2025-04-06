import axios from "axios"

export const urls = {
  register: "/register",
  login: "/login",
  profile: "/profile",
  logout: "/logout",
  my_sequences: "/sequence/my-sequences",
  my_leads: "/lead-source/my-leads",
  my_email_templates: "/email-template/my-templates",
  new_sequence: "/sequence/new",
}

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export default apiClient
