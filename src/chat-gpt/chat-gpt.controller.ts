import { Body, Controller, Post } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { PromptChatGtpDto } from './dtos/prompt-chat-gtp.dto';

@Controller('chat')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) { }
  
  @Post('ask')
  async asKQuestion(@Body() promptChatGptDto : PromptChatGtpDto): Promise<{ response: string }> {
    const response = await this.chatGptService.generateResponse(promptChatGptDto.prompt);
    return { response };
  }
}
