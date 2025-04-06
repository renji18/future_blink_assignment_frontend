import { ReactFlowProvider } from "reactflow";
import { FlowCanvas } from "../components/FlowCanvas";

export default function FlowCanvasWrapper() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  )
}