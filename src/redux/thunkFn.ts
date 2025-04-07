import { createAsyncThunk } from "@reduxjs/toolkit"
import { REGISTER_BODY } from "../api/dto/register.dto"
import {
  getFlowsApi,
  loginApi,
  logoutApi,
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

// Get Flows Thunk
export const getFlows = createAsyncThunk(
  "getFlows",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFlowsApi()
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
