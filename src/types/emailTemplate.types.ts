export interface EmailTemplateInterface {
  id: string
  name: string
  subject: string
  body: string
  leadSourceId: string
  emailTemplateId: string
  userId: string
  delayInterval: number
  delayUnit: string
}
