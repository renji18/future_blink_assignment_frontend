import { LeadInterface } from "./lead.types"

export interface FlowInterface {
  id: string
  name: string
  userId: string
  data: any[]
  leads: Array<LeadInterface>
  createdAt: string
  _count: {
    leads: number
  }
  scheduledAt: string
}
