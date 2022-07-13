import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './models/file.model';
import { Video } from './models/video.model';
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
