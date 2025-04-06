import { createAsyncThunk } from "@reduxjs/toolkit"
import { REGISTER_BODY } from "../api/dto/register.dto"
import {
  loginApi,
  logoutApi,
  myEmailTemplatesApi,
  myLeadsApi,
  mySequencesApi,
  profileApi,
  registerApi,
} from "../api"
import { AxiosError } from "axios"
import { LOGIN_BODY } from "../api/dto/login.dto"

// Register User Thunk
export const registerUser = createAsyncThunk(
  "registerUser",
  async (data: REGISTER_BODY, { rejectWithValue }) => {
    try {
      const response = await registerApi(data)
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.msg)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  }
)

// Login User Thunk
export const loginUser = createAsyncThunk(
  "loginUser",
  async (data: LOGIN_BODY, { rejectWithValue }) => {
    try {
      const response = await loginApi(data)
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.msg)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  }
)

// Get User Profile Thunk
export const userProfile = createAsyncThunk(
  "userProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileApi()
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.msg)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  }
)

// Get User Profile Thunk
export const userSequences = createAsyncThunk(
  "userSequences",
  async (_, { rejectWithValue }) => {
    try {
      const response = await mySequencesApi()
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.msg)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  }
)

// Get User Profile Thunk
export const userLeads = createAsyncThunk(
  "userLeads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myLeadsApi()
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.msg)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  }
)

// Get User Profile Thunk
export const userEmailTemplates = createAsyncThunk(
  "userEmailTemplates",
  async (_, { rejectWithValue }) => {
    try {
      const response = await myEmailTemplatesApi()
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.msg)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  }
)

// Logout Thunk
export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi()
      return response
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data.msg)
      }
      return rejectWithValue("An unexpected error occurred.")
    }
  }
)
