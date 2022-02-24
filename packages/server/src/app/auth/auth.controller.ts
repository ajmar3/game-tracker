import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from './auth.decorators';
import { userLoginDto } from './auth.models';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() input: userLoginDto) {
    const token = await this.authService.login(input);
    return token
  }

}
