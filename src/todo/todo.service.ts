import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Todo, TodoStatus} from '../model/todo.model';
import { CreateTodoDto } from 'src/dto/todo.dto';
import { Users } from 'src/model/user.model';
import { QueryTypes } from 'sequelize';


@Injectable()
export class TodoService {
    sequelize: any;
    constructor(
        @InjectModel(Todo)
        private todoModel :typeof Todo
    ){}

    async findAll(user : Users): Promise<Todo[]>{
        // console.log("in service"+(await this.todoModel.findAll()).length)
        // return this.todoModel.findAll();
        // const query = await this.todoModel.findAll('todo');
        const query = `
        SELECT * FROM todos
        WHERE userId = :userId
      `;
      try {
        const todos = await this.sequelize.query(query, {
          replacements: { userId: user.id },
          type: QueryTypes.SELECT,
          model: Todo,
          mapToModel: true,
        });
        return todos;
      } catch (err) {
        throw new NotFoundException('No todo found');
      }
        return 
    }

    async createTodo(createDto : CreateTodoDto):Promise<Todo>{
        return this.todoModel.create({
            title:createDto.title,
            description:createDto.description,
            status:TodoStatus.OPEN
        });
    }

   async filterone(id:string):Promise<Todo>{
    return this.todoModel.findByPk(id)

   }

   async update(id:string,status:TodoStatus):Promise<Todo>{
    const updatedCount = await this.todoModel.update(
        { status },
        { where: { id } }
      );
  
      if (updatedCount[0] === 0) {
        throw new Error('Todo not found');
      }
  
      const updatedTodo = await this.todoModel.findByPk(id);
  
      return updatedTodo;
   }

   async delete(id:number): Promise<void>{
    const deletedrow = await this.todoModel.destroy({where:{id}});

    if(deletedrow===0){
        throw new Error('Todo not found');
    }
   }
}
