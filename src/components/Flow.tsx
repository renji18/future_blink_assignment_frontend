import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react"
import { useCallback, useMemo, useState } from "react"
import LeadsNode from "./nodes/LeadsNode"

const initialNodes = [
  {
    id: "1",
    data: { label: "Sequence Start Point" },
    position: { x: 100, y: 0 },
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 100, y: -100 },
    data: { value: 123 },
  },
]

const initialEdges = [{ id: "1-2", source: "1", target: "2", type: "step" }]

const Flow = () => {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  )

  const nodeTypes = useMemo(() => ({ textUpdater: LeadsNode }), [])

  return (
    <div className="h-[80vh] w-[85vw] border-2">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{
          backgroundColor: "#e5e7eb",
        }}
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

export default Flow
