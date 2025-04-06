import React, { useState } from "react"
import { Handle, NodeProps, Position, useReactFlow } from "reactflow"
import Papa from "papaparse"

type LeadSourceNodeProps = NodeProps & {
  onHeadersExtracted?: (nodeId: string, headers: string[]) => void
}

const LeadSourceNode = ({
  id,
  data,
  onHeadersExtracted,
}: LeadSourceNodeProps) => {
  const { setNodes } = useReactFlow()
  const [filename, setFilename] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFilename(file.name)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const leads = results.data as Record<string, string>[]
        const headers = leads.length > 0 ? Object.keys(leads[0]) : []

        setNodes((nodes) =>
          nodes.map((node) =>
            node.id === id
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    filename: file.name,
                    headers,
                    leads,
                  },
                }
              : node
          )
        )

        if (onHeadersExtracted && headers.length > 0) {
          onHeadersExtracted(id, headers)
        }
      },
    })
  }

  return (
    <div className="bg-white border-2 border-blue-500 rounded-md p-4 shadow-md w-72">
      <strong className="text-blue-600">Lead Source</strong>

      <div className="mt-2">
        <label className="block text-sm text-gray-700 mb-1">
          Upload Leads (CSV)
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-2 w-full"
        />
        {filename && (
          <div className="text-sm text-green-700">Uploaded: {filename}</div>
        )}

        {data.leads?.length > 0 && (
          <div className="mt-2 text-xs text-gray-600">
            <p className="mb-1 font-semibold">Preview:</p>
            {data.leads.slice(0, 3).map((lead: any, idx: number) => (
              <div key={idx} className="mb-1">
                {Object.entries(lead)
                  .slice(0, 2)
                  .map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}: </span>
                      {String(value)}
                    </div>
                  ))}
              </div>
            ))}
            {data.leads.length > 3 && (
              <p className="text-gray-400">
                ...and {data.leads.length - 3} more
              </p>
            )}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}

export default LeadSourceNode
