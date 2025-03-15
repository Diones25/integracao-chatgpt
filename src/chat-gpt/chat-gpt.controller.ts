import { Body, Controller, Post } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { PromptChatGtpDto } from './dtos/prompt-chat-gtp.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('chat')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) { }
  
  @Post('ask')
  @ApiOperation({
    summary: 'Pergunta ao ChatGPT',
    description: 'Endpoint para perguntar ao ChatGPT'
  })
  @ApiResponse({
    status: 200,
    description: 'Resposta do ChatGPT',
    example: {
      response: 'A capital da Alemanha é Berlim'
    }
  })
  @ApiResponse({
    status: 400,
    description: "Falha na requisição ao ChatGPT",
    example: {
      message: "Failed to generate response from ChatGPT",
      error: "Bad Request",
      statusCode: 400
    }
  })
  async asKQuestion(@Body() promptChatGptDto : PromptChatGtpDto): Promise<{ response: string }> {
    const response = await this.chatGptService.generateResponse(promptChatGptDto.prompt);
    return { response };
  }
}
