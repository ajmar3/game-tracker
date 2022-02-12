import { Module } from '@nestjs/common';
import { UserController } from './pool.controller';  
import { UserService } from './pool.service';
import { User, UserSchema } from './pool.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDao } from './pool.dao';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserDao],
})
export class UserModule {}
