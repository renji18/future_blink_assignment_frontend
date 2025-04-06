export interface CREATE_FLOW_BODY {
  name: string
  data: any[]
  leads: Record<string, string>[]
}
