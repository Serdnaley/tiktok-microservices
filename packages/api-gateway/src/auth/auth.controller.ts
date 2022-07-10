import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';
import {
  ApiSuccessResponse,
} from '../swagger/decorators/api-success-response.decorator';
import { AuthService } from './auth.service';
import { ApiJwtAuth } from './decorators/api-jwt-auth.decorator';
import { ApiLocalAuth } from './decorators/api-local-auth.decorator';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
@ApiExtraModels(LoginResponseDto)
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('login')
  @ApiLocalAuth()
  @ApiSuccessResponse(LoginResponseDto)
  async login (
    @Request() req,
    @Body() body: LoginRequestDto,
  ) {
    return this.authService.login(req.user.id, req.user.email);
  }

  @Get('profile')
  @ApiJwtAuth()
  // @todo response type should be UserDto
  async getProfile (@Request() req) {
    return this.authService.getProfile(req.user.id);
  }
}
