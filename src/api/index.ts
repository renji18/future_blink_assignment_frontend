import apiWrapper from "../util/apiWrapper"
import { CREATE_FLOW_BODY } from "./dto/flow.create.dto"
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

// CREATE FLOW
export const createFlowApi = (data: CREATE_FLOW_BODY) =>
  apiWrapper(() => apiClient.post(urls.flow, data))
