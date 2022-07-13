import { Expose } from 'class-transformer';

export class MessageDto {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  userId: number;

  @Expose()
  createdAt: Date;
}
