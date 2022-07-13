import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './models/file.model';
import { Video } from './models/video.model';

@Injectable()
export class VideosService {
  constructor (
    @InjectModel(Video) private readonly videoModel: typeof Video,
    @InjectModel(File) private readonly fileModel: typeof File,
  ) {}

  async findAllPaginated ({ page, limit }) {
    const {
      rows: data,
      count: total,
    } = await this.videoModel.findAndCountAll({
      include: [this.fileModel],
      limit,
      offset: (page - 1) * limit,
    });

    return {
      limit,
      page,
      data,
      total,
    };
  }

  async findAllByUserIdPaginated ({ userId, page, limit }) {
    const {
      rows: data,
      count: total,
    } = await this.videoModel.findAndCountAll({
      where: { userId },
      include: [this.fileModel],
      limit,
      offset: (page - 1) * limit,
    });

    return {
      limit,
      page,
      data,
      total,
    };
  }
}
