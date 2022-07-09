import { Model, Table, ForeignKey } from 'sequelize-typescript'
import { User } from './user.model'
import { File } from './file.model'

@Table({
  timestamps: true
})
export class Video extends Model {
  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => File)
  fileId: number;
}
