import { createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"
import { UserInterface } from "../types/user.types"
import { loginUser, logoutUser, registerUser, userProfile } from "./thunkFn"

const initialState: {
  user: UserInterface
  isLoggedIn: boolean
  loading: boolean
  error: any
  status: string | number
} = {
  user: {
    id: "",
    name: "",
    email: "",
  },
  isLoggedIn: false,
  loading: false,
  error: null,
  status: "",
}

const dataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.status = "pending"
      state.loading = true
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false
      const { status, data, msg } = action.payload

      if (status === 200) {
        state.status = "register success"
        state.user.email = data.email
        state.user.name = data.name
        state.user.id = data.id
        state.isLoggedIn = true
        toast.success(msg)
      } else {
        state.status = "error"
        toast.error(msg)
      }
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        toast.error(action.payload)
      }
      state.status = "error"
      state.loading = false
    })

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.status = "pending"
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      const { status, data, msg } = action.payload

      if (status === 200) {
        state.status = "login success"
        state.user.email = data.email
        state.user.name = data.name
        state.user.id = data.id
        state.isLoggedIn = true
        toast.success(msg)
      } else {
        state.status = "error"
        toast.error(msg)
      }
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        toast.error(action.payload)
      }
      state.status = "error"
      state.loading = false
    })

    // User Profile
    builder.addCase(userProfile.pending, (state) => {
      state.status = "pending"
      state.loading = true
    })
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.loading = false
      const { status, data, msg } = action.payload

      if (status === 200) {
        state.status = "profile success"
        state.user.email = data.email
        state.user.name = data.name
        state.user.id = data.id
        state.isLoggedIn = true
        toast.success(msg)
      } else {
        state.status = "error"
        toast.error(msg)
      }
    })
    builder.addCase(userProfile.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        toast.error(action.payload)
      }
      state.status = "error"
      state.loading = false
    })

    // Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.status = "pending"
      state.loading = true
    })
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false
      const { status, msg } = action.payload

      if (status === 200) {
        state = initialState
        toast.success(msg)
      } else {
        state.status = "error"
        toast.error(msg)
      }
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        toast.error(action.payload)
      }
      state.status = "error"
      state.loading = false
    })
  },
})

export const {} = dataSlice.actions
export default dataSlice.reducer
