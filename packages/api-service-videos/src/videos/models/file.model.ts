import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Video } from './video.model';

@Table({
  timestamps: true,
})
export class File extends Model {
  @Column
  name: string;

  @Column
  url: string;

  @HasOne(() => Video, { foreignKey: 'fileId' })
  video: Video;
}
