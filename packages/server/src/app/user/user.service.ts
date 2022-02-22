import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDao } from './user.dao';
import { createUserDto } from './user.models';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(private userDao: UserDao) {}

  async getAll(){
    return await this.userDao.getAll();
  }

  async getUserById(userId: string){
    return await this.userDao.getUserById(userId);
  }

  async getUserByEmail(email: string){
    return await this.userDao.getUserByEmail(email);
  }
}
