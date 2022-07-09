import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  timestamps: true
})
export class File extends Model {
  @Column
  name: string;

  @Column
  url: string;
}
