import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller()
export class MessagesController {
  constructor (private readonly messagesService: MessagesService) {}

  @MessagePattern('createMessage')
  create (@Payload() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @MessagePattern('findMessagesByChatId')
  findByChatId (
    @Payload('chatId') chatId: number,
    @Payload('page') page: number,
    @Payload('limit') limit: number,
    @Payload('userId') userId: number,
  ) {
    return this.messagesService.findByChatId({ chatId, page, limit, userId });
  }
}
