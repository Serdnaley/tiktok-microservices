import { Transport } from '@nestjs/microservices';

export class ConfigService {
  public readonly envConfig: { [key: string]: any } = null;

  constructor () {
    this.envConfig = {
      jwt: {
        secret: this.get('JWT_SECRET'),
      },

      gateway: {
        port: this.getNumber('API_GATEWAY_PORT'),
      },

      usersService: {
        options: {
          port: this.getNumber('API_SERVICE_USERS_PORT'),
          host: this.get('API_SERVICE_USERS_HOST'),
        },
        transport: Transport.TCP,
      },
    };
  }

  public get (key: string): string {
    if (!(key in process.env)) {
      throw new Error(`Environment variable ${key} is undefined`);
    }

    return process.env[key];
  }

  public getNumber (key: string): number {
    return Number(this.get(key));
  }
}
