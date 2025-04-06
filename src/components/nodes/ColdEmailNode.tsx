import React, { useRef } from "react"
import { Handle, NodeProps, Position, useReactFlow } from "reactflow"

type ColdEmailNodeProps = NodeProps & {
  leadHeadersMap?: Record<string, string[]>
}

const ColdEmailNode = ({ id, data, leadHeadersMap }: ColdEmailNodeProps) => {
  const { setNodes } = useReactFlow()
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, [name]: value } }
          : node
      )
    )
  }

  const handleInsertVariable = (variable: string) => {
    const textarea = bodyRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const before = data.body?.substring(0, start) || ""
    const after = data.body?.substring(end) || ""
    const updatedBody = `${before}{{${variable}}}${after}`

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                body: updatedBody,
              },
            }
          : node
      )
    )

    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = textarea.selectionEnd =
        start + variable.length + 4
    }, 0)
  }

  const allHeaders = leadHeadersMap ? Object.values(leadHeadersMap).flat() : []
  const uniqueHeaders = Array.from(new Set(allHeaders))

  return (
    <div className="bg-white border-2 border-rose-500 rounded-md p-4 shadow-md w-[500px]">
      <strong className="text-rose-600">Cold Email</strong>

      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          name="subject"
          value={data.subject || ""}
          onChange={handleChange}
          placeholder="Enter subject"
          className="mt-1 p-1 w-full border border-gray-300 rounded"
        />
      </div>

      {/* Available Variables */}
      {uniqueHeaders.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1 font-medium">
            Available Variables:
          </p>
          <div className="flex flex-wrap gap-1 text-xs">
            {uniqueHeaders.map((header) => (
              <button
                type="button"
                key={header}
                onClick={() => handleInsertVariable(header)}
                className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded hover:bg-gray-300 transition-all"
              >
                {"{{" + header + "}}"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Body Field */}
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700">Body</label>
        <textarea
          ref={bodyRef}
          name="body"
          value={data.body || ""}
          onChange={handleChange}
          placeholder="Enter body"
          rows={8}
          className="mt-1 p-1 w-full border border-gray-300 rounded nodrag h-40"
        />
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default ColdEmailNode
