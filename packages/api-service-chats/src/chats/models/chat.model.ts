import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class Chat extends Model {
  @Column
  name: string;
}
