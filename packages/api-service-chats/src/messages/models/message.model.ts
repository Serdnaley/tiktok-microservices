import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Chat } from '../../chats/models/chat.model';

@Table({
  timestamps: true,
})
export class Message extends Model {
  @Column
  text: string;

  @ForeignKey(() => Chat)
  chatId: number;
}
