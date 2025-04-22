import OpenAI from 'openai'
import 'dotenv/config'
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat'

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
type ChatBody = Optional<ChatCompletionCreateParamsNonStreaming, 'model'>

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_AUTHORIZATION_KEY,
})

function chat (body: ChatBody) {
  return openai.chat.completions.create({
    model: 'deepseek-chat',
    ...body,
  })
}

export { openai, chat }
