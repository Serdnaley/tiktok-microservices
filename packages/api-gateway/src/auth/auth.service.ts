import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser (email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user && user.password === pass) {
      return user;
    }

    return null;
  }

  async login (sub, email) {
    return {
      accessToken: this.jwtService.sign({ sub, email }),
    };
  }
}
