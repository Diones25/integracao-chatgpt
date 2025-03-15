import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PromptChatGtpDto {
  
  @ApiProperty({ example: 'Qual a capital da Alemanha', description: 'Prompt para o ChatGPT' })
  @IsString({ message: 'Deve ser uma string' })
  prompt: string;
}