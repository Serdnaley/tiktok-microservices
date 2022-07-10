import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './global/config.service';

async function bootstrap () {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('v1');

  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/docs', app, document);

  await app.listen(new ConfigService().envConfig.gateway.port);
}

bootstrap();
