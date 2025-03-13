import { IsString } from "class-validator";

export class PromptChatGtpDto {
  
  @IsString({ message: 'Deve ser uma string' })
  prompt: string;
}