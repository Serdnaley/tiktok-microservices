import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from '../messages/models/message.model';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatUser } from './models/chat-user.model';
import { Chat } from './models/chat.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Chat, ChatUser, Message]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
