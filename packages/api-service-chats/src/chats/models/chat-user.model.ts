import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Chat } from './chat.model';

@Table({
  timestamps: true,
})
export class ChatUser extends Model {
  @ForeignKey(() => Chat)
  chatId: number;

  @Column
  userId: number;
}
