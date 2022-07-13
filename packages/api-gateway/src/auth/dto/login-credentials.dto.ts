import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class LoginCredentialsDto {
  @Expose()
  @ApiProperty({
    example: 'test@example.com',
  })
  @IsString()
  email: string;

  @Expose()
  @ApiProperty({
    example: 'password',
  })
  @IsString()
  password: string;
}
