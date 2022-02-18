import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { userLoginDto } from './auth.models';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(input: userLoginDto){
    const user = await this.userService.getUserByEmail(input.email);
    if (!user)
      throw new NotFoundException();

    const match = await bcrypt.compare(input.password, user.passwordHash);
    if (!match)
     throw new UnauthorizedException();

    const token = jwt.sign(
      { userId: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    
    return token
  }

}
