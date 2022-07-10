import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller()
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @MessagePattern('createVideo')
  create(@Payload() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @MessagePattern('findAllVideos')
  findAll() {
    return this.videosService.findAll();
  }

  @MessagePattern('findOneVideo')
  findOne(@Payload() id: number) {
    return this.videosService.findOne(id);
  }

  @MessagePattern('updateVideo')
  update(@Payload() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(updateVideoDto.id, updateVideoDto);
  }

  @MessagePattern('removeVideo')
  remove(@Payload() id: number) {
    return this.videosService.remove(id);
  }
}
