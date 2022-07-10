import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [
    ConfigService,
    {
      provide: 'CHATS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.envConfig.chatsService);
      },
      inject: [ConfigService],
    },
    {
      provide: 'USERS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.envConfig.usersService);
      },
      inject: [ConfigService],
    },
    {
      provide: 'VIDEOS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.envConfig.videosService);
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
