export type FlowNodeData =
  | {
      label: string
      fileName: string
      headers: string[]
      leads?: Record<string, string>[]
    } // Lead Source
  | {
      label: string
      subject: string
      body: string
    } // Cold Email
  | {
      label: string
      delay: number
      timeUnit: "minutes" | "hours" | "days"
    } // Wait/Delay
