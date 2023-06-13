import { Column, Table, Model, HasMany } from "sequelize-typescript";
import { OneToMany } from "typeorm";
import { Todo } from "./todo.model";

@Table({tableName:'users'})
export class Users extends Model<Users> {
  @Column({primaryKey: true})
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  salt: string;

  @HasMany(()=> Todo)
  todos: Todo[];
}