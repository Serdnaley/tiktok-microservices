import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { ApiJwtAuth } from '../auth/decorators/api-jwt-auth.decorator';
import {
  ApiPaginateResponse
} from '../common/decorators/api-paginate-response.decorator';
import { VideoDto } from './dto/video.dto';

@ApiJwtAuth()
@ApiExtraModels(VideoDto)
@Controller('videos')
export class VideosController {
  constructor (
    @Inject('VIDEOS_SERVICE') private readonly videosServiceClient: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiTags('Videos')
  @ApiPaginateResponse(VideoDto)
  async getRecommendations (
    @Query('page') page: number,
  ) {
    const {
      total,
      limit,
      data: videos,
    } = await firstValueFrom(
      this.videosServiceClient.send(
        'findAllVideosPaginated',
        { page, limit: 10 },
      ),
    );

    const data = await Promise.all(
      videos.map((video) => this.transformVideo(video)),
    );

    return {
      success: true,
      total,
      limit,
      page,
      data: plainToInstance(VideoDto, data, { excludeExtraneousValues: true }),
    };
  }

  @Get('user/:userId')
  @ApiTags('Videos')
  @ApiPaginateResponse(VideoDto)
  async findByUserId (
    @Param('userId') userId: string,
    @Query('page') page: number,
  ) {
    const {
      total,
      limit,
      data: videos,
    } = await firstValueFrom(
      this.videosServiceClient.send(
        'findVideosByUserIdPaginated',
        { userId, page, limit: 10 },
      ),
    );

    const data = await Promise.all(
      videos.map((video) => this.transformVideo(video)),
    );

    return {
      success: true,
      total,
      limit,
      page,
      data: plainToInstance(VideoDto, data, { excludeExtraneousValues: true }),
    };
  }

  async transformVideo (video) {
    video.user = await firstValueFrom(
      this.usersServiceClient.send(
        'findOneUserById',
        { id: video.userId },
      ),
    );

    return video;
  }
}
