import { Expose, Type } from 'class-transformer';
import { MessageDto } from './message.dto';

class UserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  avatarUrl: string;
}

export class ChatDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserDto)
  companion: UserDto;

  @Expose()
  @Type(() => MessageDto)
  lastMessage: MessageDto;

  @Expose()
  createdAt: Date;
}
