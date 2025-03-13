import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { ChatGptController } from './chat-gpt.controller';

@Module({
  providers: [ChatGptService],
  controllers: [ChatGptController]
})
export class ChatGptModule {}
