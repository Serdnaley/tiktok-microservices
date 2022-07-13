import { Controller, Request } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller()
export class ChatsController {
  constructor (private readonly chatsService: ChatsService) {}

  @MessagePattern('findChatsPaginated')
  findPaginated (
    @Payload('page') page: number,
    @Payload('limit') limit: number,
    @Payload('userId') userId?: number,
  ) {
    return this.chatsService.findPaginated({ page, limit, userId });
  }

  @MessagePattern('createChat')
  create (@Payload() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @MessagePattern('findOneChatById')
  findOne (
    @Payload('chatId') chatId: number,
    @Payload('userId') userId: number,
  ) {
    return this.chatsService.findOne(chatId, userId);
  }
}
