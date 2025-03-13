import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ChatGptModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
