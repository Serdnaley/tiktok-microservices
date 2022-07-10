import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GlobalModule } from './global/global.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { FilesModule } from './files/files.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule,
    UsersModule,
    VideosModule,
    FilesModule,
    ChatsModule,
    MessagesModule,
  ],
})
export class AppModule {}
