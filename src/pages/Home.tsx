import { useEffect } from "react"
import { MySelector } from "../redux/store"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  const { isLoggedIn } = MySelector((state) => state.data)

  useEffect(() => {
    if (isLoggedIn) return
    navigate("/auth")
  }, [isLoggedIn, navigate])

  return (
    <>
      <div className="flex flex-col h-screen w-screen justify-center items-center gap-10">
        <button
          onClick={() => navigate("/flow/new")}
          className="bg-teal-700 text-white px-3 py-1.5 rounded-md cursor-pointer"
        >
          Create New Sequence
        </button>
      </div>
    </>
  )
}

export default Home
