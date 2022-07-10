import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GlobalModule } from './global/global.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';
import { FilesModule } from './files/files.module';
import { FilesModule } from './files/files.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule,
    UsersModule,
    VideosModule,
    FilesModule,
  ],
})
export class AppModule {}
