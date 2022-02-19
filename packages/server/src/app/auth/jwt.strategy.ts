import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { appConfig } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.JWT_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    console.log(payload)
    return { userId: payload.userId, firstName: payload.firstName, lastName: payload.lastName, email: payload.email };
  }
}