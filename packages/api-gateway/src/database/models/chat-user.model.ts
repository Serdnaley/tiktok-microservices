import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Chat } from './chat.model';

@Table({
  timestamps: true,
})
export class ChatUser extends Model {
  @ForeignKey(() => Chat)
  chatId: number;

  @ForeignKey(() => User)
  userId: number;
}
