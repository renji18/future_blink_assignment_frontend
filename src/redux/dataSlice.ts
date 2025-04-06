import { createSlice } from "@reduxjs/toolkit"
import { toast } from "sonner"
import { UserInterface } from "../types/user.types"
import { LeadSourceInterface } from "../types/leadSource.types"
import { EmailTemplateInterface } from "../types/emailTemplate.types"
import { SequenceInterface } from "../types/sequence.types"
import {
  loginUser,
  logoutUser,
  registerUser,
  userEmailTemplates,
  userLeads,
  userProfile,
  userSequences,
} from "./thunkFn"

const initialState: {
  user: UserInterface
  leadSource: Array<LeadSourceInterface>
  emailTemplate: Array<EmailTemplateInterface>
  sequence: Array<SequenceInterface>
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
  leadSource: [],
  emailTemplate: [],
  sequence: [],
  isLoggedIn: false,
  loading: false,
  error: null,
  status: "",
}

const dataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    addNewSequence: (state, action) => {
      state.sequence = [action.payload, ...state.sequence]
    },
  },
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

    // User Sequences
    builder.addCase(userSequences.pending, (state) => {
      state.status = "pending"
      state.loading = true
    })
    builder.addCase(userSequences.fulfilled, (state, action) => {
      state.loading = false
      const { status, data, msg } = action.payload

      if (status === 200) {
        state.status = "fetch sequences success"
        state.sequence = [...data].reverse()
      } else {
        state.status = "error"
        toast.error(msg)
      }
    })
    builder.addCase(userSequences.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        toast.error(action.payload)
      }
      state.status = "error"
      state.loading = false
    })

    // User Leads
    builder.addCase(userLeads.pending, (state) => {
      state.status = "pending"
      state.loading = true
    })
    builder.addCase(userLeads.fulfilled, (state, action) => {
      state.loading = false
      const { status, data, msg } = action.payload

      if (status === 200) {
        state.status = "fetch leads success"
        state.leadSource = data
      } else {
        state.status = "error"
        toast.error(msg)
      }
    })
    builder.addCase(userLeads.rejected, (state, action) => {
      if (typeof action.payload === "string") {
        toast.error(action.payload)
      }
      state.status = "error"
      state.loading = false
    })

    // User Email Templates
    builder.addCase(userEmailTemplates.pending, (state) => {
      state.status = "pending"
      state.loading = true
    })
    builder.addCase(userEmailTemplates.fulfilled, (state, action) => {
      state.loading = false
      const { status, data, msg } = action.payload

      if (status === 200) {
        state.status = "fetch leads success"
        state.emailTemplate = data
      } else {
        state.status = "error"
        toast.error(msg)
      }
    })
    builder.addCase(userEmailTemplates.rejected, (state, action) => {
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

export const { addNewSequence } = dataSlice.actions
export default dataSlice.reducer
