import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor (
    @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser (email: string, pass: string): Promise<Record<string, any> | null> {
    const user = await firstValueFrom(
      this.usersServiceClient.send('findOneUserByEmail', email),
    );

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
