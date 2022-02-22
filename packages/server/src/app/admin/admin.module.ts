import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';  
import { AdminService } from './admin.service';
import { UserDao } from '../user/user.dao';
import { GameDao } from '../game/game.dao';


@Module({
  imports: [
    UserDao,
    GameDao
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class UserModule {}
