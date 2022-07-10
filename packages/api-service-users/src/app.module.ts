import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GlobalModule } from './global/global.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GlobalModule,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
