import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { VideosService } from './videos.service';

@Controller()
export class VideosController {
  constructor (private readonly videosService: VideosService) {}

  @MessagePattern('findAllVideosPaginated')
  findAllPaginated (
    @Payload('page') page: number,
    @Payload('limit') limit: number,
  ) {
    return this.videosService.findAllPaginated({ page, limit });
  }

  @MessagePattern('findVideosByUserIdPaginated')
  findAllByUserIdPaginated (
    @Payload('userId') userId: number,
    @Payload('page') page: number,
    @Payload('limit') limit: number,
  ) {
    return this.videosService.findAllByUserIdPaginated({ userId, page, limit });
  }
}
