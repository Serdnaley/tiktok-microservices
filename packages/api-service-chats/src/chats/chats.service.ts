import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from '../messages/models/message.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatUser } from './models/chat-user.model';
import { Chat } from './models/chat.model';

@Injectable()
export class ChatsService {
  constructor (
    @InjectModel(Chat) private readonly chatModel: typeof Chat,
    @InjectModel(ChatUser) private readonly chatUserModel: typeof ChatUser,
    @InjectModel(Message) private readonly messageModel: typeof Message,
  ) {}

  async findPaginated ({ page, limit, userId }) {
    const total = await this.chatUserModel.count({ where: { userId } })
    const data = await this.chatUserModel.findAll({
      where: { userId },
      include: [{
        model: this.chatModel,
        as: 'chat',
        include: [{
          model: this.chatUserModel,
          as: 'chatUsers',
        }, {
          model: this.messageModel,
          as: 'lastMessage',
        }],
      }],
      limit,
      offset: (page - 1) * limit,
    })

    const chats = data.map(chatUser => chatUser.chat);

    return {
      limit,
      page,
      data: chats,
      total,
    }
  }

  async create (createChatDto: CreateChatDto) {
    const { userId, companionId } = createChatDto;

    if (userId === companionId) {
      throw new BadRequestException('You can\'t chat with yourself');
    }

    const foundChat = await this.chatModel.findOne({
      include: [{
        model: this.chatUserModel,
        as: 'companion1',
        where: { userId },
        required: true,
      }, {
        model: this.chatUserModel,
        as: 'companion2',
        where: { userId: companionId },
        required: true,
      }],
    })

    if (foundChat) {
      return await this.findOne(foundChat.id, userId);
    }

    const chat = await this.chatModel.create();

    await Promise.all([
      this.chatUserModel.create({ userId, chatId: chat.id }),
      this.chatUserModel.create({ userId: companionId, chatId: chat.id }),
    ])

    return await this.findOne(chat.id, userId)
  }

  async findOne (id: number, userId: number) {
    const chat = await this.chatModel.findByPk(id, {
      include: [{
        model: this.chatUserModel,
        as: 'chatUsers',
      }, {
        model: this.messageModel,
        as: 'lastMessage',
      }],
    })

    if (!chat?.chatUsers.some((chatUser) => chatUser.userId === userId)) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }
}
