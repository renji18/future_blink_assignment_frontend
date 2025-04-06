import apiWrapper from "../util/apiWrapper"
import { LOGIN_BODY } from "./dto/login.dto"
import { REGISTER_BODY } from "./dto/register.dto"
import apiClient, { urls } from "./urls"

// REGISTER
export const registerApi = (data: REGISTER_BODY) =>
  apiWrapper(() => apiClient.post(urls.register, data))

// LOGIN
export const loginApi = (data: LOGIN_BODY) =>
  apiWrapper(() => apiClient.post(urls.login, data))

// PROFILE
export const profileApi = () => apiWrapper(() => apiClient.get(urls.profile))

// LOGOUT
export const logoutApi = () => apiWrapper(() => apiClient.get(urls.logout))

// MY SEQUENCES
export const mySequencesApi = () =>
  apiWrapper(() => apiClient.get(urls.my_sequences))

// MY SOURCES
export const myLeadsApi = () => apiWrapper(() => apiClient.get(urls.my_leads))

// MY EMAIL TEMPALTES
export const myEmailTemplatesApi = () =>
  apiWrapper(() => apiClient.get(urls.my_email_templates))

// NEW SEQUENCE
export const newSequenceApi = (data: { name: string }) =>
  apiWrapper(() => apiClient.post(urls.new_sequence, data))
