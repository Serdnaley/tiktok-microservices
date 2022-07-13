import { Module } from '@nestjs/common';
import { GlobalModule } from './common/global.module';
import { DatabaseModule } from './database/database.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule,
    VideosModule,
  ],
})
export class AppModule {}
