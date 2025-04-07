import { useNavigate, useParams } from "react-router-dom"
import { MySelector } from "../redux/store"
import ReactFlow, { Background, Controls } from "reactflow"
import ColdEmailNode from "../components/nodes/ColdEmailNode"
import LeadSourceNode from "../components/nodes/LeadSourceNode"
import WaitDelayNode from "../components/nodes/WaitDelayNode"
import { useEffect } from "react"

const nodeTypes = {
  coldEmail: ColdEmailNode,
  leadSource: LeadSourceNode,
  waitDelay: WaitDelayNode,
}

const statusColorMap: Record<string, string> = {
  pending: "bg-gray-200 text-gray-700",
  success: "bg-green-200 text-green-800",
  error: "bg-red-200 text-red-800",
}

const FlowPreview = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { flows } = MySelector((state) => state.data)
  const flow = flows.find((f) => f.id === id)

  useEffect(() => {
    navigate(`/flow/${id}`, { replace: true })

    const handlePopState = () => {
      navigate("/", { replace: true })
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [navigate, id])

  if (!flow) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Flow not found.
      </div>
    )
  }

  const nodes = flow.data.map((node: any) => ({
    ...node,
    draggable: false,
    selectable: false,
  }))

  return (
    <div className="min-h-screen w-screen flex items-center flex-row gap-6 px-4 py-6">
      {/* Flowchart */}
      <div className="flex-1 h-[90vh] border shadow-sm rounded-md overflow-hidden">
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          elementsSelectable={false}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Lead List */}
      <div className="w-fit border rounded-md shadow-sm bg-white overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b text-lg font-medium">
          Leads Status
        </div>
        {flow.leads.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">
            No leads available.
          </div>
        ) : (
          <div className="overflow-auto">
            <div className="px-4 py-1 flex items-center gap-5">
              <p className="text-xs">Scheduled On:</p>
              <p className="text-sm">
                {new Date(flow.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <div className="px-4 py-1 flex items-center gap-5">
              <p className="text-xs">Scheduled For:</p>
              <p className="text-sm">
                {new Date(flow.scheduledAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left text-xs uppercase text-gray-600">
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {flow.leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 font-medium text-gray-800">
                      {lead.email}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColorMap[lead.status]
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlowPreview
