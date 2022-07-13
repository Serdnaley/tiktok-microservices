import { HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Message } from '../../messages/models/message.model';
import { ChatUser } from './chat-user.model';

@Table({
  timestamps: true,
})
export class Chat extends Model {
  @HasOne(() => Message, { foreignKey: 'chatId' })
  lastMessage: Message;

  @HasMany(() => Message, { foreignKey: 'chatId' })
  messages: Message[];

  @HasMany(() => ChatUser, { foreignKey: 'chatId' })
  chatUsers: ChatUser[];

  @HasOne(() => ChatUser, { foreignKey: 'chatId' })
  companion1: ChatUser;

  @HasOne(() => ChatUser, { foreignKey: 'chatId' })
  companion2: ChatUser;
}
