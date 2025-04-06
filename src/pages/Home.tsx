import { useEffect, useState } from "react"
import { MySelector } from "../redux/store"
import { useNavigate } from "react-router-dom"
import NewSequence from "../components/modals/NewSequence"

const Home = () => {
  const navigate = useNavigate()

  const { isLoggedIn, sequence } = MySelector((state) => state.data)

  const [newSequenceModal, setNewSequenceModal] = useState(false)

  useEffect(() => {
    if (isLoggedIn) return
    navigate("/auth")
  }, [isLoggedIn, navigate])

  return (
    <>
      <div className="flex flex-col h-screen w-screen justify-center items-center gap-10">
        <button
          className="bg-teal-700 text-white px-3 py-1.5 rounded-md cursor-pointer"
          onClick={() => setNewSequenceModal(true)}
        >
          Create New Sequence
        </button>
        {sequence?.length > 0 && (
          <div className="w-1/3 space-y-5">
            {sequence?.map((seq) => (
              <div
                onClick={() => navigate(`/sequence/${seq.id}`)}
                key={seq.id}
                className="bg-gray-100 px-3 py-1.5 rounded-md flex items-center justify-between cursor-pointer"
              >
                <p className="font-medium">{seq.name}</p>
                <p className="text-xs">Click To Open</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <NewSequence
        newSequenceModal={newSequenceModal}
        setNewSequenceModal={setNewSequenceModal}
      />
    </>
  )
}

export default Home
