import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @MessagePattern('findOneUser')
  findOne (@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('findOneUserByEmail')
  findOneByEmail (@Payload() email: string) {
    return this.usersService.findOneByEmail(email);
  }
}
