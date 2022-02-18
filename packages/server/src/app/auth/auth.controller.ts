import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { userLoginDto } from './auth.models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() input: userLoginDto) {
    return await this.authService.login(input);
  }

}
