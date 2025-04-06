import { AxiosResponse } from "axios"

const apiWrapper = async <T>(fn: () => Promise<AxiosResponse<T>>) => {
  const response = await fn()
  return {
    msg: (response.data as any).msg,
    data: (response.data as any).data || null,
    status: response.status,
  }
}

export default apiWrapper
