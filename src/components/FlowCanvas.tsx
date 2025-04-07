import React, { useCallback, useMemo, useState } from "react"
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  NodeProps,
} from "reactflow"
import { v4 as uuidv4 } from "uuid"
import ColdEmailNode from "./nodes/ColdEmailNode"
import WaitDelayNode from "./nodes/WaitDelayNode"
import LeadSourceNode from "./nodes/LeadSourceNode"
import { toast } from "sonner"
import { FlowNodeData } from "../types/flow.node"
import { createFlowApi } from "../api"
import { getFlows } from "../redux/thunkFn"
import { useDispatch } from "react-redux"
import { MyDispatch } from "../redux/store"
import { useNavigate } from "react-router-dom"

export const FlowCanvas = () => {
  const dispatch = useDispatch<MyDispatch>()
  const navigate = useNavigate()

  const [nodes, setNodes, onNodesChange] = useNodesState<FlowNodeData>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const [fileName, setFileName] = useState<string>("FLOW NAME HERE")
  const [leadHeadersMap, setLeadHeadersMap] = useState<
    Record<string, string[]>
  >({})

  const handleHeadersExtracted = useCallback(
    (nodeId: string, headers: string[]) => {
      setLeadHeadersMap((prev) => ({
        ...prev,
        [nodeId]: headers,
      }))
    },
    []
  )

  const nodeTypes = useMemo(
    () => ({
      coldEmail: (nodeProps: NodeProps) => (
        <ColdEmailNode {...nodeProps} leadHeadersMap={leadHeadersMap} />
      ),
      waitDelay: WaitDelayNode,
      leadSource: (nodeProps: NodeProps) => (
        <LeadSourceNode
          {...nodeProps}
          onHeadersExtracted={handleHeadersExtracted}
        />
      ),
    }),
    [leadHeadersMap, handleHeadersExtracted]
  )

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const addNode = (type: "coldEmail" | "waitDelay" | "leadSource") => {
    const nodeExists = (nodeType: string) =>
      nodes.some((node) => node.type === nodeType)

    if (type === "coldEmail" && nodeExists("coldEmail")) {
      toast.warning("Only one Cold Email node is allowed.")
      return
    }

    if (type === "leadSource" && nodeExists("leadSource")) {
      toast.warning("Only one Lead Source node is allowed.")
      return
    }

    if (type === "waitDelay") {
      if (nodeExists("waitDelay")) {
        toast.warning("Only one Wait/Delay node is allowed.")
        return
      }
      if (!nodeExists("coldEmail")) {
        toast.warning("Add a Cold Email node before Wait/Delay.")
        return
      }
    }

    let data: FlowNodeData

    if (type === "leadSource") {
      data = {
        label: "Lead Source node",
        fileName: "",
        headers: [],
      }
    } else if (type === "coldEmail") {
      data = {
        label: "Cold Email node",
        subject: "",
        body: "",
      }
    } else {
      data = {
        label: "Wait/Delay node",
        delay: 1,
        timeUnit: "days",
      }
    }

    const newNode: Node<FlowNodeData> = {
      id: uuidv4(),
      type,
      position: {
        x: Math.random() * 250,
        y: Math.random() * 250,
      },
      data,
    }

    const newEdges: Edge[] = []

    const coldEmailNode = nodes.find((node) => node.type === "coldEmail")
    const leadSourceNode = nodes.find((node) => node.type === "leadSource")
    const waitDelayNode = nodes.find((node) => node.type === "waitDelay")

    if (type === "leadSource" && coldEmailNode) {
      newEdges.push({
        id: `edge-${newNode.id}-${coldEmailNode.id}`,
        source: newNode.id,
        target: coldEmailNode.id,
      })
    }

    if (type === "coldEmail") {
      if (leadSourceNode) {
        newEdges.push({
          id: `edge-${leadSourceNode.id}-${newNode.id}`,
          source: leadSourceNode.id,
          target: newNode.id,
        })
      }
      if (waitDelayNode) {
        newEdges.push({
          id: `edge-${newNode.id}-${waitDelayNode.id}`,
          source: newNode.id,
          target: waitDelayNode.id,
        })
      }
    }

    if (type === "waitDelay" && coldEmailNode) {
      newEdges.push({
        id: `edge-${coldEmailNode.id}-${newNode.id}`,
        source: coldEmailNode.id,
        target: newNode.id,
      })
    }

    setNodes((nds) => [...nds, newNode])
    setEdges((eds) => [...eds, ...newEdges])
  }

  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      setEdges((eds) =>
        eds.filter(
          (e) =>
            !deleted.some(
              (node) => node.id === e.source || node.id === e.target
            )
        )
      )
    },
    [setEdges]
  )

  const handleScheduleFlow = async () => {
    const leadSourceNode = nodes.find((node) => node.type === "leadSource")
    const coldEmailNode = nodes.find((node) => node.type === "coldEmail")

    if (!leadSourceNode) return toast.error("Please add a Lead Source node.")

    if (!coldEmailNode) return toast.error("Please add a Cold Email node.")

    const { subject, body } = coldEmailNode.data as any

    if (!subject?.trim())
      return toast.error("Cold Email subject cannot be empty.")

    if (!body?.trim()) return toast.error("Cold Email body cannot be empty.")

    const leads = (leadSourceNode.data as any).leads
    if (!Array.isArray(leads) || leads.length === 0)
      return toast.error("Leads not found in Lead Source node.")

    try {
      const res = await createFlowApi({ name: fileName, data: nodes, leads })

      if (res.status === 200) {
        toast.success("Flow scheduled successfully!")
        dispatch(getFlows())
        navigate(`/flow/${res.data.id}`)
      }
    } catch (error) {
      toast.error("Failed to schedule flow.")
      console.error(error)
    }
  }

  return (
    <div className="h-screen w-full flex">
      {/* Sidebar for adding nodes */}
      <div className="w-60 bg-gradient-to-b from-teal-600 to-cyan-700 text-white p-4">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="text-lg font-semibold mb-20 text-black px-4 py-2 rounded w-full outline-none text-center"
        />
        <button
          onClick={() => addNode("leadSource")}
          className="bg-white text-black px-4 py-2 rounded mb-2 w-full"
        >
          Lead Source
        </button>
        <button
          onClick={() => addNode("coldEmail")}
          className="bg-white text-black px-4 py-2 rounded mb-2 w-full"
        >
          Cold Email
        </button>
        <button
          onClick={() => addNode("waitDelay")}
          className="bg-white text-black px-4 py-2 rounded w-full"
        >
          Wait/Delay
        </button>

        <button
          onClick={handleScheduleFlow}
          className="mt-20 bg-yellow-400 text-black px-4 py-2 rounded w-full"
        >
          Schedule
        </button>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodesDelete={onNodesDelete}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <MiniMap />
          <Controls />
          <Background gap={12} />
        </ReactFlow>
      </div>
    </div>
  )
}
