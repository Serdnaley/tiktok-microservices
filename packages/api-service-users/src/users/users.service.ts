import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor (@InjectModel(User) private readonly userModel: typeof User) {}
  findOne(id: number) {
    return this.userModel.findByPk(id);
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }
}
