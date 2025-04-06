import React from "react"
import { Handle, NodeProps, Position, useReactFlow } from "reactflow"

const WaitDelayNode = ({ id, data }: NodeProps) => {
  const { setNodes } = useReactFlow()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                [name]: value,
              },
            }
          : node
      )
    )
  }

  return (
    <div className="bg-white border-2 border-purple-500 rounded-md p-4 shadow-md w-60">
      <strong className="text-purple-600">Wait/Delay</strong>

      <div className="mt-2">
        <label className="block text-sm text-gray-700 mb-1">Delay Time</label>
        <input
          type="number"
          min={1}
          name="delayValue"
          value={data.delayValue || ""}
          onChange={handleChange}
          placeholder="e.g., 2"
          className="p-1 w-full border border-gray-300 rounded mb-2"
        />

        <select
          name="delayUnit"
          value={data.delayUnit || "minutes"}
          onChange={handleChange}
          className="p-1 w-full border border-gray-300 rounded"
        >
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
      </div>

      <Handle type="target" position={Position.Top} />
    </div>
  )
}

export default WaitDelayNode
