import { Global, Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './config.service';

@Global()
@Module({
  providers: [
    ConfigService,
  ],
  exports: [
    ConfigService,
  ],
})
export class GlobalModule {}
