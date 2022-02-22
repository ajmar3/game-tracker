import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';  
import { AdminService } from './admin.service';
import { UserDao } from '../user/user.dao';
import { GameDao } from '../game/game.dao';
import { PoolPlayer, PoolPlayerSchema } from '../game/game.schema';
import { User, UserSchema } from '../user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from '../game/game.module';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    GameModule,
    UserModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
