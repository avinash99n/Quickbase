import { registerDecorator, validateSync } from '@nestjs/class-validator';
import { Controller, Post,Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { UserLoginDto } from 'src/dto/userLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    registration(@Body(ValidationPipe) regDto:RegisterUserDto){
        return this.authService.registerUser(regDto);
    }

    @Post('login')
    sigin(@Body(ValidationPipe) loginDTO:UserLoginDto){
        return this.authService.loginUser(loginDTO);
    }
}
