import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUserDto } from './pool.models';
import { UserService } from './pool.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll() {
    return await this.userService.getAll();
  }

  @Post('create')
  async newUser(@Body() input: createUserDto) {
    return await this.userService.createUser(input);
  }

  @Get(':id')
  async getUser(@Param("id") userId: string) {
    return await this.userService.getUser(userId);
  }
}
