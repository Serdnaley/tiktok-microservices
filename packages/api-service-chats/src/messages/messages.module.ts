import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChatsModule } from '../chats/chats.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message } from './models/message.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Message]),
    ChatsModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
