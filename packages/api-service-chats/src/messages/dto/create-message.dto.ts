import { IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  chatId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  text: string;
}
