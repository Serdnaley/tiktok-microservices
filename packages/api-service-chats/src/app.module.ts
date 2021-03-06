import { Module } from '@nestjs/common';
import { ChatsModule } from './chats/chats.module';
import { GlobalModule } from './common/global.module';
import { DatabaseModule } from './database/database.module';
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
