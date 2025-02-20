import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol..enum';
import { Auth } from './decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { UserActiveInterface } from 'src/common/interface/user-active.interface';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post("/register")
    register(@Body() registerDto: RegisterDto){
        return this.authService.register(registerDto)
    }

    @Post("/login")
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

    // @Get("profile")
    // @Roles(Role.USER)//Metadato creado decorador, despues se crea el guard para leer el rol
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(@Req() req: RequestWithUser){
    //     return this.authService.profile(req.user);
    // }

    @Get("profile")
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserActiveInterface){
        return this.authService.profile(user);
    }
}