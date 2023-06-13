import { Controller, Get, Post, Body, Param, ValidationPipe, Patch,Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/dto/todo.dto';
import { Todo, TodoStatus } from '../model/todo.model';
import { TodoStatusValidationPipe } from 'src/pipes/TodoStatusValidation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/model/user.model';
import { User } from "../auth/user.decorator";

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
    constructor(private todoService :TodoService){
        
    }
    @Get()
    getAllTodos(
        @User() user:Users){
        // console.log("here" + this.todoService.findAll())
        return this.todoService.findAll(user);
    }

    @Post()
    createNewTodo(@Body(ValidationPipe) todoDto : CreateTodoDto ):Promise<Todo>{
        
        return this.todoService.createTodo(todoDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string):Promise<Todo>{
        return this.todoService.filterone(id);
    }

    @Patch(':id')
    updateTodo(

        @Body('status',TodoStatusValidationPipe)status:TodoStatus,@Param('id')id: string){
            console.log("data"+ status);
            return this.todoService.update(id,status);
        }

    @Delete(':id')
    deleteTodo(@Param('id') id:number){
        return this.todoService.delete(id);
    }
        
    
    
}
