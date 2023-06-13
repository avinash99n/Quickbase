import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RegisterUserDto } from 'src/dto/registerUser.dto';
import { Users } from 'src/model/user.model';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from 'src/dto/userLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
    @InjectModel(Users)
    private userModel :typeof Users,private jwt:JwtService
){}

async loginUser(userLoginDto:UserLoginDto){
    const {username, password} = userLoginDto;
    const user = await this.userModel.findOne({ where: { username } });
    if(!user){
        throw new UnauthorizedException('Invalid crededntials');
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password)
    if(isPasswordMatch){
        const jwtPayLoad ={username};
        const jwtToken = await this.jwt.signAsync(jwtPayLoad,{expiresIn:'1d',algorithm:'HS512'});

        return {token :jwtToken};
    }

    else{
throw new UnauthorizedException('Invalid Credentials');
    }
}

async registerUser(registerdto: RegisterUserDto){
const {username, password} = registerdto;
const hashed = await bcrypt.hash(password, 12);
const salt = await bcrypt.getSalt(hashed);


return this.userModel.create({
    username:username,
    password:hashed,
    salt:salt
});


}

}
