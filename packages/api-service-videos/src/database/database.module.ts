import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigService } from '../global/config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.envConfig.database
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
