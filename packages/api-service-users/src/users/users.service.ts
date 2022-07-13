import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor (@InjectModel(User) private readonly userModel: typeof User) {}

  findOne (id: number) {
    return this.userModel.findByPk(id);
  }

  findOneByEmail (email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findOneByUsername (username: string) {
    return this.userModel.findOne({ where: { username } });
  }
}
