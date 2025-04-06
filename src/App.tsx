import "reactflow/dist/style.css"
import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { MyDispatch } from "./redux/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { userProfile } from "./redux/thunkFn"
import FlowCanvasWrapper from "./pages/FlowCanvasWrapper"

const App = () => {
  const dispatch = useDispatch<MyDispatch>()

  useEffect(() => {
    const loadUserData = async () => {
      const result = await dispatch(userProfile())

      if (userProfile.fulfilled.match(result)) {
      }
    }

    loadUserData()
  }, [dispatch])

  return (
    <div className="h-screen w-screen max-h-screen min-h-screen">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/flow/new" element={<FlowCanvasWrapper />} />
      </Routes>
    </div>
  )
}

export default App
