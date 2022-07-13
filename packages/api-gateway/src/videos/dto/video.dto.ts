import { Expose, Type } from 'class-transformer';

class VideoUserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  avatarUrl: string;
}

class VideoFileDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  url: string;
}

export class VideoDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => VideoUserDto)
  user: VideoUserDto;

  @Expose()
  @Type(() => VideoFileDto)
  file: VideoFileDto;
}
