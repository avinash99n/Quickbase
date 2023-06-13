import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtCustomStrategy } from './jwt-custom.strategy';

@Module({
  providers: [AuthService, JwtCustomStrategy],
  controllers: [AuthController],
  imports:[SequelizeModule.forFeature([Users]),
  JwtModule.register({
    secret: 'LOijtrkljdklsufidsui12jkj43k21l4',
    signOptions: {
      algorithm: 'HS512',
      expiresIn: '1d'
    }
  }),PassportModule.register({
    defaultStrategy:'jwt'}
  )],
  exports:[PassportModule, JwtCustomStrategy]
})
export class AuthModule {}
