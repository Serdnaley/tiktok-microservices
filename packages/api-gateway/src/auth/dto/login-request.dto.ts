import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    example: 'test@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}
