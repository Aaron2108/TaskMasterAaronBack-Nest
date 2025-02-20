import { CreateTaskDto } from './dto/create-task.dto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';
import { UserActiveInterface } from '../common/interface/user-active.interface';
import { Role } from 'src/common/enums/rol..enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async getTasks(user: UserActiveInterface){
        if(user.role === Role.ADMIN){
            return await this.taskRepository.find();
        }
        return this.taskRepository.find({
            where:{userEmail: user.email}
        })
    }
    async getFindOne(id:number, user:UserActiveInterface){
        const task = await this.taskRepository.findOneBy({id})
        if(!task){
            throw new BadRequestException('Task not found');
        }
        this.validateOwnership(task, user);

        return task;
    }

    async createTasks(createTaskDto: CreateTaskDto, user: UserActiveInterface) {
        const userDb = await this.userRepository.findOneBy({ email: user.email });
    
        if (!userDb) {
            throw new BadRequestException('User not found');
        }
    
        const nuevaTarea = this.taskRepository.create({
            ...createTaskDto,
            user: userDb, 
            userEmail: user.email, 
        });
    
        return this.taskRepository.save(nuevaTarea);
    }
    
    

    async updateTasks(id: number, updateTaskDto: UpdateTaskDto, user: UserActiveInterface) {
        const task = await this.getFindOne(id, user);
    
        if (!task) {
            throw new BadRequestException('Task not found');
        }
    
        this.validateOwnershipUser(task, user);
    
        const { user: _, ...updateData } = updateTaskDto;
    
        Object.assign(task, updateData);
    
        return await this.taskRepository.save(task);
    }
    

    async deleteTasks(id: number, user: UserActiveInterface) {
        const task = await this.getFindOne( id , user);
    
        if (!task) {
            throw new BadRequestException('Task not found');
        }
    
        this.validateOwnershipUser(task, user);
        return this.taskRepository.softDelete({id});
    }

    private validateOwnership(task: Task, user: UserActiveInterface){
        if(user.role !== Role.ADMIN && task.userEmail !== user.email){
            throw new UnauthorizedException();
        }
    }

    private validateOwnershipUser(task: Task, user: UserActiveInterface){
        if(user.role !== Role.USER && task.userEmail !== user.email){
            throw new UnauthorizedException();
        }
    }

    private validateOwnershipAdminOrUser(task: Task, user: UserActiveInterface) {
        if (!user || !user.role) {
            throw new UnauthorizedException('Invalid user');
        }
    
        if ((user.role !== Role.ADMIN && user.role !== Role.USER) || task.userEmail !== user.email) {
            throw new UnauthorizedException();
        }
    }
}
