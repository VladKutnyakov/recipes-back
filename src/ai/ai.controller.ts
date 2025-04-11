import { Body, Controller, Post } from '@nestjs/common'
import { AiService } from './ai.service'
import { CreateAiMessageDto, ResponseCreateAiMessageDto } from './ai.dto'

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('recipe')
  async requestRecipe(@Body() dto: CreateAiMessageDto): Promise<ResponseCreateAiMessageDto | undefined> {
    const res = await this.aiService.sendMessage(dto)
    const responseDto = res.choices[0].message.content
      ? JSON.parse(res.choices[0].message.content) as ResponseCreateAiMessageDto
      : undefined
    return responseDto
  }
}
