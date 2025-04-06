import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import dataSlice from "./dataSlice"

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
})

export type MyDispatch = typeof store.dispatch

export const MySelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
