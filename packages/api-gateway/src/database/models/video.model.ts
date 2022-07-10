import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { File } from './file.model';

@Table({
  timestamps: true,
})
export class Video extends Model {
  @ForeignKey(() => User)
  userId: number;

  @ForeignKey(() => File)
  fileId: number;
}
