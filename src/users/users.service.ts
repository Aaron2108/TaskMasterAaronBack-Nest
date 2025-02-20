import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-task.dto';

@Injectable()
export class UsersService {
    constructor(
            @InjectRepository(User)
            private readonly userRepository: Repository<User>
        ){}
    
        findAll(){
            return this.userRepository.find()
        }

        findOneByEmail(email:string){
            return this.userRepository.findOneBy({email})
        }

        findByEmailWithPassword(email:string){
            return this.userRepository.findOne(
                { 
                    where: {email},
                    select: ['id', 'email', 'password','role'], 
                })
        }


        findOne(id:number){
            return this.userRepository.findOneBy({id})
        }
        create(createUserDto: CreateUserDto) {
        return this.userRepository.save(createUserDto)
    }
    
        update(id: number, updateUserDto: UpdateUserDto){
            return this.userRepository.update(id, updateUserDto);
        }
        remove(id: number){
            return this.userRepository.softDelete({id});
        }
}
