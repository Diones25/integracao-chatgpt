import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { max } from 'rxjs';

@Injectable()
export class ChatGptService {
  private readonly apiKey: string | undefined;
  private readonly apiUrl: string = 'https://api.openai.com/v1/chat/completions';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async generateResponse(prompt: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
    }

    try {
      const response = await axios.post(this.apiUrl, data, { headers });
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error calling OpenAI API:', error.response?.data || error.message);
      throw new BadRequestException('Failed to generate response from ChatGPT');
    }
  }
}
