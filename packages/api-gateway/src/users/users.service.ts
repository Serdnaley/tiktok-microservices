import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor (@InjectModel(User) private readonly userModel: typeof User) {}

  async create (createUserDto: CreateUserDto) {
    // @todo
    // return this.userModel.create(createUserDto);
  }

  async findAll () {
    return this.userModel.findAll();
  }

  async findOne (id: number) {
    return this.userModel.findOne({ where: { id } });
  }

  async findOneByEmail (email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async update (id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  async remove (id: number) {
    // @todo
    // return this.userModel.delete({ where: { id } });
  }
}
