import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { userLoginDto } from './auth.models';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(input: userLoginDto){
    const user = await this.userService.getUserByEmail(input.email);
    if (!user)
      throw new UnauthorizedException("Username or password is incorrect");

    const match = await bcrypt.compare(input.password, user.passwordHash);
    if (!match)
     throw new UnauthorizedException("Username or password is incorrect");

    const token = await this.jwtService.signAsync(
      { userId: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin }
    );
    
    return token
  }

  async login1(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
