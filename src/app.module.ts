import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
// import { Sequelize,SequelizeOptions } from 'sequelize-typescript';
import { SequelizeModule,SequelizeModuleOptions } from '@nestjs/sequelize';
import { Todo } from './model/todo.model';
import { AuthModule } from './auth/auth.module';
import { Users } from './model/user.model';


@Module({
  imports: [TodoModule,AuthModule,SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Hansiavi@7234',
    database: 'todo',
    models: [Todo,Users],
    autoLoadModels: true,
    synchronize: true

  }), AuthModule],
  controllers: [AppController],
  providers: [AppService]})
export class AppModule {}

