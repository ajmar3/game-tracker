import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Admin, Public } from './auth/auth.decorators';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor() {}

  @Admin()
  @Get('pub')
  publicTest(@Request() req) {
    return "Public";
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
