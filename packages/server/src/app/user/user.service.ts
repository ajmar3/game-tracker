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
    await this.userDao.getAll();
  }

  async createUser(model: createUserDto) {
    return this.userDao.createUser(model);
  }

  async getUser(userId: string){
    await this.userDao.getUser(userId);
  }

  async createAdminUser(model: createUserDto) {
    return this.userDao.createUser(model);
  }
}
