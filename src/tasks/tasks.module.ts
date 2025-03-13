import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { EstadoService } from 'src/estado/estado.service';
import { EstadoModule } from 'src/estado/estado.module';

@Module({
  imports:[TypeOrmModule.forFeature([Task]), UsersModule, EstadoModule],
  controllers: [TasksController],
  providers: [TasksService, UsersService, EstadoService],

})
export class tasksModule {}
