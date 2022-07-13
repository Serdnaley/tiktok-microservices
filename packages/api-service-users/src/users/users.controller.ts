import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @MessagePattern('findOneUserById')
  findOne (@Payload('id') id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('findOneUserByEmail')
  findOneByEmail (@Payload('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @MessagePattern('findOneUserByUsername')
  findOneByUsername (@Payload('username') username: string) {
    return this.usersService.findOneByUsername(username);
  }
}
