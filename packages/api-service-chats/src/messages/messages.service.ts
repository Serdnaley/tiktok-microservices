import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChatsService } from '../chats/chats.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './models/message.model';

@Injectable()
export class MessagesService {
  constructor (
    @InjectModel(Message) private readonly messageModel: typeof Message,
    private readonly chatsService: ChatsService,
  ) {}

  async create (createMessageDto: CreateMessageDto) {
    const { chatId, userId, text } = createMessageDto;

    await this.chatsService.findOne(chatId, userId);

    return this.messageModel.create({ chatId, userId, text });
  }

  async findByChatId ({ chatId, page, limit, userId }) {
    await this.chatsService.findOne(chatId, userId);

    const {
      rows: data,
      count: total,
    } = await this.messageModel.findAndCountAll({
      where: { chatId },
      limit,
      offset: (page - 1) * limit,
    })

    return {
      limit,
      page,
      data,
      total,
    }
  }
}
