import { Module } from '@nestjs/common';
import { UserController } from './user.controller';  
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDao } from './user.dao';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserDao],
  exports: [UserService, UserDao],
})
export class UserModule {}
