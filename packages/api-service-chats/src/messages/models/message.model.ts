import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Chat } from '../../chats/models/chat.model';

@Table({
  timestamps: true,
})
export class Message extends Model {
  @Column
  text: string;

  @Column
  userId: number;

  @HasOne(() => Chat, { foreignKey: 'chatId' })
  chat: Chat;
}
