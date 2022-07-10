import { Injectable } from '@nestjs/common';
import { Dialect } from 'sequelize';

@Injectable()
export class ConfigService {
  public readonly envConfig: { [key: string]: any } = null;

  constructor () {
    this.envConfig = {
      service: {
        port: this.getNumber('SERVICE_PORT'),
      },

      database: {
        dialect: this.get('DATABASE_DIALECT') as Dialect,
        host: this.get('DATABASE_HOST'),
        port: this.getNumber('DATABASE_PORT'),
        username: this.get('DATABASE_USERNAME'),
        password: this.get('DATABASE_PASSWORD'),
        database: this.get('DATABASE_DATABASE'),
        autoLoadModels: true,
        synchronize: true,
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
