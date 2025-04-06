import { Box, Modal } from "@mui/material"
import { MySelector } from "../../redux/store"
import { useState } from "react"
import { style } from "../../util/modalStyle"

const LeadSource = ({
  leadModal,
  setLeadModal,
}: {
  leadModal: boolean
  setLeadModal: (arg: boolean) => void
}) => {
  const { leadSource } = MySelector((state) => state.data)

  const [selectedSource, setSelectedSource] = useState<string>()

  return (
    <Modal
      open={leadModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="p-2">
          <div className="flex justify-end border-b-2 pb-2">
            <span
              className="text-red-500 border-2 border-red-500 rounded-md px-1.5 font-bold cursor-pointer"
              onClick={() => setLeadModal(false)}
            >
              X
            </span>
          </div>

          {leadSource?.length > 0 && (
            <div className="p-2 flex flex-col justify-center items-center gap-2">
              <p className="font-medium">Select from list</p>

              <select
                name="lead_source"
                id="lead_source"
                className="border-2 rounded-md outline-none"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
              >
                <option value="">Select From Existing Sources</option>
                {leadSource?.map((ls) => (
                  <option key={ls.id} value={ls.id}>
                    {ls.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* <p>Upload Csv</p> */}
        </div>
      </Box>
    </Modal>
  )
}

export default LeadSource
