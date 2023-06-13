import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "src/model/user.model";

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Users)
    private userModel:typeof Users
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'LOijtrkljdklsufidsui12jkj43k21l4'
    });
  }

  async validate(payload: {username: string}) {
    const {username} = payload;
    const user = await this.userModel.findOne({where :{username}});

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}