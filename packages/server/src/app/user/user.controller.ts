import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getUser(@Param("id") userId: string) {
    return await this.userService.getUserById(userId);
  }
}
