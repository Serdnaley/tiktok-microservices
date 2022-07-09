import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  login (loginUserDto: LoginUserDto) {
    return 'login';
  }

  register (registerUserDto: RegisterUserDto) {
    return 'register';
  }
}
