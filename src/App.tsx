import "reactflow/dist/style.css"
import { Route, Routes } from "react-router-dom"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { MyDispatch, MySelector } from "./redux/store"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getFlows, userProfile } from "./redux/thunkFn"
import FlowCanvasWrapper from "./pages/FlowCanvasWrapper"
import FlowPreview from "./pages/FlowPreview"

const App = () => {
  const dispatch = useDispatch<MyDispatch>()

  const { isLoggedIn } = MySelector((state) => state.data)

  useEffect(() => {
    dispatch(userProfile())
  }, [dispatch])

  useEffect(() => {
    if (!isLoggedIn) return
    dispatch(getFlows())
  }, [isLoggedIn, dispatch])

  return (
    <div className="h-screen w-screen max-h-screen min-h-screen">
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/flow/new" element={<FlowCanvasWrapper />} />
        <Route path="/flow/:id" element={<FlowPreview />} />
      </Routes>
    </div>
  )
}

export default App
