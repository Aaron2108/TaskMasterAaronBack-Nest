import { RegisterDto } from './dto/register.dto';
import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ){}
    
    async register({email, password}:RegisterDto){
        const user = await this.usersService.findOneByEmail(email)

        if(user){
            throw new BadRequestException("User already exists")
        }

        await this.usersService.create(
            {
                email, 
                password: await bcryptjs.hash(password, 10),
                
            })
        return { message: 'User registered successfully' };
    }
    async login({email, password}: LoginDto ){
        const user = await this.usersService.findByEmailWithPassword(email)
        if(!user){
            throw new UnauthorizedException("Invalid credentials")
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);
        if(!isValidPassword){
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload =  { email: user.email, role: user.role }

        const token =  await this.jwtService.signAsync(payload)

        return {
            token,
            email
        };
    }

    async profile({email, role}: {email:string, role:string}){

        // if(role !== 'admin'){
        //     throw new UnauthorizedException("You are not authorization to access this resourse")
        // }

        return await this.usersService.findOneByEmail(email);
    }


}
