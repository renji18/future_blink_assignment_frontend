import "@xyflow/react/dist/style.css"
import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { MyDispatch } from "./redux/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Sequence from "./pages/Sequence"
import {
  userEmailTemplates,
  userLeads,
  userProfile,
  userSequences,
} from "./redux/thunkFn"

const App = () => {
  const dispatch = useDispatch<MyDispatch>()

  useEffect(() => {
    const loadUserData = async () => {
      const result = await dispatch(userProfile())

      if (userProfile.fulfilled.match(result)) {
        dispatch(userSequences())
        dispatch(userLeads())
        dispatch(userEmailTemplates())
      }
    }

    loadUserData()
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/sequence/:id" element={<Sequence />} />
      </Routes>
    </>
  )
}

export default App
