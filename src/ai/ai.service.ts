import { Injectable } from '@nestjs/common'
import { client } from 'src/utils/gigachat'
import { CreateAiMessageDto } from './ai.dto'

@Injectable()
export class AiService {
  sendMessage(dto: CreateAiMessageDto) {
    const systemPrompt = `
      Ты - книга рецептов всех кухонь мира. Проанализируй входные данные и на их основе распиши мне один из РЕАЛЬНЫХ рецептов. Входные данные представлены в формате JSON со следующими полями:
      ingredients - список ингредиентов, используемых в рецепте\n
      cuisine - кухня или стиль приготовления пищи, свойственный указанному месту\n
      comment - примечание, которое нужно принять во внимание при составлении рецепта\n
      \n
      В ответе не должно быть НИЧЕГО, кроме объекта в формате JSON со следующими полями:\n
      name - название блюда;\n
      ingredients - массив, содержащий объекты, описывающие требуемые ингредиенты и содержащие два поля: name - название ингредиента, amount - требуемое количество;\n
      portions - количество порций, которое получится после приготовления блюда по твоему рецепту;\n
      steps - массив, содержащий этапы приготовления блюда;
    `
    const message = `
      ### ВХОДНЫЕ ДАННЫЕ\n
      ${JSON.stringify(dto)}
    `
    return client.chat({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
    })
  }
}
