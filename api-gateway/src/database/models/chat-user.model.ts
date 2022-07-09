import { ForeignKey, Model, Table } from 'sequelize-typescript'
import { Chat } from './chat.model'
import { User } from './user.model'

@Table({
  timestamps: true
})
export class ChatUser extends Model {
  @ForeignKey(() => Chat)
  chatId: number;

  @ForeignKey(() => User)
  userId: number;
}
