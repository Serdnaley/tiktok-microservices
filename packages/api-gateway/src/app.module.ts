import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './common/global.module';
import { VideosModule } from './videos/videos.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    AuthModule,
    GlobalModule,
    VideosModule,
    ChatsModule,
  ],
})
export class AppModule {}
