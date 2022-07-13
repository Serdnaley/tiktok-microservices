import {
  BelongsTo,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chat } from './chat.model';

@Table({
  timestamps: true,
})
export class ChatUser extends Model {
  @Column
  userId: number;

  @BelongsTo(() => Chat, { foreignKey: 'chatId' })
  chat: Chat;
}
