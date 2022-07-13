import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor (
    @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser (
    email: string,
    pass: string,
  ): Promise<Record<string, any> | null> {
    const user = await firstValueFrom(
      this.usersServiceClient.send(
        'findOneUserByEmail',
        { email: email.trim().toLowerCase() },
      ),
    );

    if (await this.comparePassword(pass, user.password)) {
      return user;
    }

    return null;
  }

  async login (sub, email) {
    return {
      accessToken: this.jwtService.sign({ sub, email }),
    };
  }

  async getProfile (id: number) {
    return await firstValueFrom(
      this.usersServiceClient.send('findOneUserById', { id }),
    );
  }

  public async comparePassword (
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashPassword);
  }

  public async hashPassword (password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
