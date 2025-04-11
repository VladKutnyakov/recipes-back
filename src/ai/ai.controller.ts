import { Body, Controller, Post } from '@nestjs/common'
import { AiService } from './ai.service'
import { CreateAiMessageDto } from './ai.dto'

@Controller('ai')
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('recipe')
  requestRecipe(@Body() dto: CreateAiMessageDto) {
    return this.aiService.sendMessage(dto)
  }
}
