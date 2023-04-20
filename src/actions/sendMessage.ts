import { MessageModel } from "@chatscope/chat-ui-kit-react"

const API_KEY = import.meta.env.VITE_API_KEY // Sua chave de api - https://docs.writesonic.com/reference/finding-your-api-key

export type apiReqBodyDto = {
  enable_google_results?: boolean,
  enable_memory?: boolean,
  is_sent?: boolean,
  input_text?: string,
  history_data?: MessageModel[] & apiReqBodyDto[]
}
type apiResDto = {
  message: string
}
export const sendMessage = async (apiRequestBody: apiReqBodyDto):Promise<apiResDto | undefined>  => {
  try {
    const res = await fetch('https://api.writesonic.com/v2/business/content/chatsonic?engine=premium&language=pt-br', {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY
    },
    body: JSON.stringify(apiRequestBody)
  })
  return res.json()
  } catch (error) {
    alert('Error api call')
    return new Error()
  }
}