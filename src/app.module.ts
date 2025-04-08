import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AiModule } from './ai/ai.module'
import { AiController } from './ai/ai.controller'

@Module({
  imports: [AiModule],
  controllers: [AppController, AiController],
  providers: [AppService],
})
export class AppModule {}
