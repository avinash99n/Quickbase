import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { ManyToOne } from 'typeorm';
import { Users } from './user.model';

@Table
export class Todo extends Model<Todo> {
  
  @Column({primaryKey :true})
  id: number;

  @Column
  title: string;

  @Column({primaryKey :true})
  @ForeignKey(()=>Users)
  userid: number;

  @Column
  description: string;

  @Column
  status : TodoStatus;

  @BelongsTo(()=> Users)
  user:Users;

}

export enum TodoStatus{
    OPEN ='OPEN',
    WIP= 'WIP',
    COMPLETED = 'COMPLETED'
}