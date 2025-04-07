export interface LeadInterface {
  id: string
  flowId: string
  email: string
  data: any
  status: "pending" | "success" | "error"
}
