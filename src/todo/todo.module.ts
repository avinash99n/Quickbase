import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from '../model/todo.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Todo]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [SequelizeModule]
})
export class TodoModule {}
