import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { AppModule } from './app.module';
import { ConfigService } from './global/config.service';

async function bootstrap () {
  const app = await NestFactory.createMicroservice<TcpOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        host: '',
        port: new ConfigService().envConfig.service.port,
      },
    },
  );

  await app.listen();
}

bootstrap();
