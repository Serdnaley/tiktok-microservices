import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { File } from './file.model';

@Table({
  timestamps: true,
})
export class Video extends Model {
  @Column
  userId: number;

  @BelongsTo(() => File, { foreignKey: 'fileId' })
  file: File;
}
