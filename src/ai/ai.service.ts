import { Injectable } from '@nestjs/common'
import { chat } from 'src/utils/deepseek'
import { CreateAiMessageDto } from './ai.dto'

@Injectable()
export class AiService {
  sendMessage(dto: CreateAiMessageDto) {
    const messageDto = {
      ...dto,
      cuisine: dto.cuisine || 'Любая',
      additionalIngredientsCount: dto.additionalIngredientsCount || 0,
    }
    const systemPrompt = `
      Ты - книга рецептов всех кухонь мира. Проанализируй входные данные и на их основе распиши мне один из РЕАЛЬНЫХ рецептов. Входные данные представлены в формате JSON со следующими полями:
      ingredients - список ингредиентов, используемых в рецепте\n
      prUseAllIngredients - признак, указывающий нужно ли использовать в рецепте ВСЕ перечисленные в ingredients ингредиенты\n
      additionalIngredientsCount - максимальное количество ингредиентов, которые ты можешь добавить к входным игредиентам дополнительно. Не считай дополнительными ингредиентами воду, соль, сахар, черный перец и тому подобное\n
      cuisine - кухня или стиль приготовления пищи, свойственный указанному месту\n
      comment - примечание, которое нужно принять во внимание при составлении рецепта\n
      \n
      В ответе не должно быть НИЧЕГО, кроме объекта в формате JSON со следующими полями:\n
      name - название блюда;\n
      ingredients - массив, содержащий объекты, описывающие требуемые ингредиенты. ВСЕ ингредиенты, упоминаемые в рецепте, должны быть представлены в этом массиве. Каждый объект ингредиента содержит два поля: name - название ингредиента, amount - требуемое количество;\n
      portions - количество порций, которое получится после приготовления блюда по твоему рецепту;\n
      steps - массив, содержащий этапы приготовления блюда;\n
      Ответ должен быть КОРРЕКТНЫМ JSON объектом БЕЗ ЛИШНИХ СИМВОЛОВ.
    `
    const message = `
      ### ВХОДНЫЕ ДАННЫЕ\n
      ${JSON.stringify(messageDto)}
    `

    return chat({
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
      temperature: 2,
      response_format: {
        type: 'json_object',
      },
    })
  }
}
