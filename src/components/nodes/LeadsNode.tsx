import { Tooltip } from "@mui/material"
import { useState } from "react"
import LeadSource from "../modals/LeadSource"

const LeadsNode = () => {
  const [leadModal, setLeadModal] = useState(false)

  return (
    <>
      <Tooltip title="Add Another Source" placement="top" arrow>
        <div
          className="border border-black rounded-sm w-[150px] p-1.5 flex flex-col items-center justify-center nodrag bg-white cursor-pointer"
          onClick={() => setLeadModal(true)}
        >
          <p className="text-[10px] font-semibold">+</p>
          <p className="text-xs font-semibold">Add Lead Source</p>
          <p className="text-[7px] font-semibold">
            Click to Add Source from List or CSV
          </p>
        </div>
      </Tooltip>

      <LeadSource leadModal={leadModal} setLeadModal={setLeadModal} />
    </>
  )
}

export default LeadsNode
