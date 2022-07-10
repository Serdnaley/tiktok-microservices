import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GlobalModule } from './global/global.module';
import { ChatsModule } from './chats/chats.module';
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
