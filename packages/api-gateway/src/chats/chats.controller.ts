import {
  NotFoundException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { ApiJwtAuth } from '../auth/decorators/api-jwt-auth.decorator';
import {
  ApiPaginateResponse,
} from '../common/decorators/api-paginate-response.decorator';
import {
  ApiSuccessResponse,
} from '../common/decorators/api-success-response.decorator';
import { ChatDto } from './dto/chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageDto } from './dto/message.dto';

@ApiJwtAuth()
@ApiExtraModels(ChatDto)
@ApiExtraModels(MessageDto)
@ApiExtraModels(CreateChatDto)
@ApiExtraModels(CreateMessageDto)
@Controller('chats')
export class ChatsController {
  constructor (
    @Inject('CHATS_SERVICE') private readonly chatsServiceClient: ClientProxy,
    @Inject('USERS_SERVICE') private readonly usersServiceClient: ClientProxy,
  ) {}

  @Get()
  @ApiTags('Chats')
  @ApiPaginateResponse(ChatDto)
  async findAll (
    @Request() req,
    @Query('page') reqPage: number,
  ) {
    const {
      total,
      limit,
      page,
      data,
    } = await firstValueFrom(
      this.chatsServiceClient.send(
        'findChatsPaginated',
        {
          userId: req.user.id,
          page: reqPage,
          limit: 20,
        },
      ),
    );

    await Promise.all(data.map(async (chat) => {
      return await this.transformChat(chat, req);
    }))

    return {
      success: true,
      page,
      limit,
      total,
      data: plainToInstance(ChatDto, data, { excludeExtraneousValues: true }),
    };
  }

  @Post()
  @ApiTags('Chats')
  @ApiSuccessResponse(ChatDto)
  async create (
    @Body() body: CreateChatDto,
    @Request() req,
  ) {
    const companion = await firstValueFrom(
      this.usersServiceClient.send(
        'findOneUserByUsername',
        { username: body.username },
      ),
    );

    if (!companion) {
      throw new NotFoundException('User not found');
    }

    const chat = await firstValueFrom(
      this.chatsServiceClient.send(
        'createChat',
        {
          userId: req.user.id,
          companionId: companion.id,
        },
      ),
    );
    const data = await this.transformChat(chat, req);

    return {
      success: !!chat,
      data: plainToInstance(ChatDto, data, { excludeExtraneousValues: true }),
    };
  }

  @Get(':chatId')
  @ApiTags('Chats')
  @ApiSuccessResponse(ChatDto)
  async findOne (
    @Param('chatId') chatId: number,
    @Request() req,
  ) {
    const chat = await firstValueFrom(
      this.chatsServiceClient.send(
        'findOneChatById',
        { chatId },
      ),
    );
    const data = await this.transformChat(chat, req);

    return {
      success: true,
      data: plainToInstance(ChatDto, data, { excludeExtraneousValues: true }),
    };
  }

  @Get(':chatId/messages')
  @ApiTags('ChatMessages')
  @ApiPaginateResponse(MessageDto)
  async findAllChatMessages (
    @Param('chatId') chatId: number,
    @Query('page') reqPage: number,
    @Request() req,
  ) {
    const messages = await firstValueFrom(
      this.chatsServiceClient.send(
        'findMessagesByChatId',
        { chatId, page: reqPage, limit: 20, userId: req.user.id },
      ),
    );

    return {
      success: true,
      data: plainToInstance(MessageDto, messages, { excludeExtraneousValues: true }),
    };
  }

  @Post(':chatId/messages')
  @ApiTags('ChatMessages')
  @ApiSuccessResponse(MessageDto)
  async createChatMessage (
    @Param('chatId') chatId: number,
    @Body() body: CreateMessageDto,
    @Request() req,
  ) {
    const message = await firstValueFrom(
      this.chatsServiceClient.send(
        'createMessage',
        { ...body, chatId, userId: req.user.id },
      ),
    );

    return {
      success: true,
      data: plainToInstance(MessageDto, message, { excludeExtraneousValues: true }),
    };
  }

  async transformChat (chat, req) {
    const { userId } = chat.chatUsers.find((chatUser) => chatUser.userId !== req.user.id);

    chat.companion = await firstValueFrom(
      this.usersServiceClient.send(
        'findOneUserById',
        { id: userId },
      ),
    );

    return chat;
  }
}
