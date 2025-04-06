import { Box, Modal } from "@mui/material"
import React, { useState } from "react"
import { style } from "../../util/modalStyle"
import { toast } from "sonner"
import { newSequenceApi } from "../../api"
import { useDispatch } from "react-redux"
import { MyDispatch } from "../../redux/store"
import { addNewSequence } from "../../redux/dataSlice"

const NewSequence = ({
  newSequenceModal,
  setNewSequenceModal,
}: {
  newSequenceModal: boolean
  setNewSequenceModal: (arg: boolean) => void
}) => {
  const dispatch = useDispatch<MyDispatch>()

  const [sequenceName, setSequenceName] = useState<string>("")

  const handleCreate = async () => {
    if (sequenceName === "")
      return toast.warning("Please Provide a sequence Name")

    const res = await newSequenceApi({ name: sequenceName })

    if (res.status === 200) {
      toast.success("Sequence Created Successfully")
      dispatch(addNewSequence(res.data))
    }

    setNewSequenceModal(false)
  }

  return (
    <Modal
      open={newSequenceModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="p-2">
          <div className="flex items-center justify-between border-b-2 pb-2">
            <p className="font-bold">Create New Sequence</p>
            <span
              className="text-red-500 border-2 border-red-500 rounded-md px-1.5 font-bold cursor-pointer"
              onClick={() => setNewSequenceModal(false)}
            >
              X
            </span>
          </div>

          <div className="p-2">
            <input
              type="text"
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              className="border border-black rounded-md w-full px-2 py-0.5 outline-none"
            />
          </div>

          <div className="px-2 flex justify-end">
            <button
              onClick={handleCreate}
              className="bg-teal-700 text-white px-3 py-1.5 rounded-md cursor-pointer"
            >
              Create
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default NewSequence
