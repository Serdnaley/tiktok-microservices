import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  ApiSuccessResponse,
} from '../common/decorators/api-success-response.decorator';
import { AuthService } from './auth.service';
import { ApiJwtAuth } from './decorators/api-jwt-auth.decorator';
import { ApiLocalAuth } from './decorators/api-local-auth.decorator';
import { AuthTokensDto } from './dto/auth-tokens.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { ProfileDto } from './dto/profile.dto';

@Controller('auth')
@ApiExtraModels(AuthTokensDto)
@ApiExtraModels(ProfileDto)
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('login')
  @ApiLocalAuth()
  @ApiTags('Auth')
  @ApiSuccessResponse(AuthTokensDto)
  async login (
    @Request() req,
    @Body() body: LoginCredentialsDto,
  ) {
    const data = plainToInstance(
      AuthTokensDto,
      await this.authService.login(req.user.id, req.user.email),
      { excludeExtraneousValues: true },
    );

    return {
      success: true,
      data,
    };
  }

  @Get('profile')
  @ApiJwtAuth()
  @ApiTags('Auth')
  @ApiSuccessResponse(ProfileDto)
  async getProfile (@Request() req) {
    const data = plainToInstance(
      ProfileDto,
      await this.authService.getProfile(req.user.id),
      { excludeExtraneousValues: true },
    );

    return {
      success: true,
      data,
    };
  }
}
