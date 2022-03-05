import { Body, Controller,Post } from '@nestjs/common';
import { Admin } from '../auth/auth.decorators';
import { createPlayerDto } from '../game/game.models';
import { createUserDto } from '../user/user.models';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Admin()
  @Post('/create/player')
  async createGame(@Body() input: createPlayerDto) {
    console.log("adminInput", input)
    return await this.adminService.createPlayer(input);
  }

  @Admin()
  @Post("create/user")
  async getUser(@Body() input: createUserDto) {
    return await this.adminService.createUser(input);
  }

}
