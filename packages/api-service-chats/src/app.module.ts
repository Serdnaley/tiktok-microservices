import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { DatabaseModule } from './database/database.module';
import { GlobalModule } from './global/global.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule,
    ChatsModule,
    MessagesModule,
  ],
})
export class AppModule {}
