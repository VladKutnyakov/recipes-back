import GigaChat from 'gigachat'
import { Agent } from 'node:https'
import 'dotenv/config'

const httpsAgent = new Agent({
  rejectUnauthorized: false,
})

const client = new GigaChat({
  timeout: 600,
  model: process.env.GIGACHAT_MODEL,
  credentials: process.env.GIGACHAT_AUTHORIZATION_KEY,
  httpsAgent: httpsAgent,
})

export { client }
