import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './models/user.model'
import { Video } from './models/video.model'
import { Dialect } from 'sequelize'

const {
  DATABASE_DIALECT,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_DATABASE,
} = process.env

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: DATABASE_DIALECT as Dialect,
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT),
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_DATABASE,
      models: [
        User,
        Video,
      ],
    }),
  ],
})
export class DatabaseModule {}
