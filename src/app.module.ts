import { Module } from '@nestjs/common';
import { tasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '70976074',
      database: 'taskdb',
      entities: [Task, User], 
      autoLoadEntities: true,
      synchronize: true,
    }),
    tasksModule,
    AuthModule,
    UsersModule,
    
  
    ],
  controllers: [],
  providers:[],
})
export class AppModule {}
