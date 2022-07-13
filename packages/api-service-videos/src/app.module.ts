import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GlobalModule } from './common/global.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule,
    VideosModule,
  ],
})
export class AppModule {}
