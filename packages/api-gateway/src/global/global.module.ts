import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [
    ConfigService,
    {
      provide: 'USERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.envConfig.usersService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    ConfigService,
    'USERS_SERVICE',
  ],
})
export class GlobalModule {}
