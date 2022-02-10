import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getAll(): string {
    return this.userService.getHello();
  }

  @Post('create')
  newUser(@Body('title') title: string): string {
    return this.userService.getHello();
  }
}
