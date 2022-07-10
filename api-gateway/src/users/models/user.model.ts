import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
})
export class User extends Model {
  @Column
  email: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  blockedAt: Date;
}
