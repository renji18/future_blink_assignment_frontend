import { ChangeEvent, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { MyDispatch, MySelector } from "../redux/store"
import { loginUser, registerUser } from "../redux/thunkFn"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch<MyDispatch>()
  const { isLoggedIn } = MySelector((state) => state.data)

  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const { name, email, password, confirmPassword } = form

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (isLogin) {
      if (!email || !password)
        return toast.warning("Please fill in all required fields")

      if (!emailRegex.test(email))
        return toast.warning("Please enter a valid email")

      dispatch(loginUser(form))
    } else {
      if (!name || !email || !password || !confirmPassword)
        return toast.warning("Please fill in all fields")

      if (!emailRegex.test(email))
        return toast.warning("Please enter a valid email")

      if (password !== confirmPassword)
        return toast.warning("Passwords do not match")

      dispatch(registerUser(form))
    }
  }

  useEffect(() => {
    if (isLoggedIn) navigate("/")
  }, [isLoggedIn, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 font-medium rounded-l-xl ${
              isLogin ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 font-medium rounded-r-xl ${
              !isLogin ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-teal-300 focus:border-teal-500 outline-none"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 outline-none border border-gray-300 rounded-md focus:ring focus:ring-teal-300 focus:border-teal-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 outline-none border border-gray-300 rounded-md focus:ring focus:ring-teal-300 focus:border-teal-500"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full p-2 outline-none border border-gray-300 rounded-md focus:ring focus:ring-teal-300 focus:border-teal-500"
                required
              />
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
