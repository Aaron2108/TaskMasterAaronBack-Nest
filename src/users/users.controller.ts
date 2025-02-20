import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-task.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enums/rol..enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Auth(Role.ADMIN)
@Controller('/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
        findAll() {
        return this.usersService.findAll();
        }
    
        @Get(':id')
        getFindOne(@Param('id') id:number) {
        return this.usersService.findOne(id);
        }
    
        @Post()
        createTask(@Body() createUserDto: CreateUserDto){
            return this.usersService.create(createUserDto);
        }
        @Patch(':id')
        update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto){
            return this.usersService.update(id, updateUserDto)
            }
    
        @Delete(':id')
        deleteTask(@Param('id') id:number) {
            return this.usersService.remove(id);
        }
}
