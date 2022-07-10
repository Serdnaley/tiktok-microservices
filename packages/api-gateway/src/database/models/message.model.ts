import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Chat } from './chat.model';

@Table({
  timestamps: true,
})
export class Message extends Model {
  @Column
  text: string;

  @ForeignKey(() => Chat)
  chatId: number;
}
