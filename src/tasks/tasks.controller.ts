import { UserActiveInterface } from './../common/interface/user-active.interface';
import { ActiveUser } from './../common/decorators/active-user.decorator';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol..enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiTags('Tasks')
@ApiBearerAuth()
@Auth(Role.USER)
@Controller("/tasks")
export class TasksController {
    constructor(private readonly taskService: TasksService){}
    @Get()
    getAllTasks(@ActiveUser() user:UserActiveInterface) {
    return this.taskService.getTasks(user);
    }

    @Get(':id')
    getFindOne(@Param('id') id:number,@ActiveUser() user:UserActiveInterface) {
    return this.taskService.getFindOne(id, user);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto,@ActiveUser() user: UserActiveInterface){
        return this.taskService.createTasks(createTaskDto, user);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto, @ActiveUser() user:UserActiveInterface){
        return this.taskService.updateTasks(id, updateTaskDto, user)
        }

    @Delete(':id')
    deleteTask(@Param('id') id:number,@ActiveUser() user: UserActiveInterface) {
        return this.taskService.deleteTasks(id, user);
    }
    
}
