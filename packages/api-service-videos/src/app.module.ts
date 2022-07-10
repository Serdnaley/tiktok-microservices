import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GlobalModule } from './global/global.module';
import { VideosModule } from './videos/videos.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule,
    VideosModule,
    FilesModule,
  ],
})
export class AppModule {}
