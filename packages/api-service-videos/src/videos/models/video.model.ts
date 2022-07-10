import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { File } from '../../files/models/file.model';

@Table({
  timestamps: true,
})
export class Video extends Model {
  @Column
  userId: number;

  @ForeignKey(() => File)
  fileId: number;
}
