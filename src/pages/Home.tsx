import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MySelector } from "../redux/store"

const Home = () => {
  const navigate = useNavigate()
  const { isLoggedIn, flows } = MySelector((state) => state.data)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth")
    }
  }, [isLoggedIn, navigate])

  return (
    <div className="min-h-screen w-screen flex flex-col items-center p-8">
      <button
        onClick={() => navigate("/flow/new")}
        className="bg-teal-700 text-white px-4 py-2 rounded-md mb-6"
      >
        Create New Sequence
      </button>

      <div className="w-full max-w-4xl space-y-4">
        {flows.length === 0 ? (
          <p className="text-center text-gray-500">No flows created yet.</p>
        ) : (
          flows
            .slice()
            .reverse()
            .map((flow) => (
              <div
                key={flow.id}
                onClick={() => navigate(`/flow/${flow.id}`)}
                className="cursor-pointer bg-white border shadow-sm rounded-md p-4 hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold">{flow.name}</h2>
                <p className="text-sm text-gray-600">
                  {flow._count?.leads ?? 0}{" "}
                  {flow._count?.leads > 1 ? "Leads" : "Lead"} • Created At:{" "}
                  {new Date(flow.createdAt).toLocaleString()}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  )
}

export default Home
