import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './models/video.model';
import { File } from './models/file.model';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

@Module({
  imports: [
    SequelizeModule.forFeature([File, Video]),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
