import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createUserDto } from "./pool.models";
import { User, UserDocument } from "./pool.schema";


@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

  async getAll(){
    return await this.userModel.find();
  }

  async createUser(model: createUserDto) {
    const createdUser = new this.userModel(model)
  
    await createdUser.save();
  
    return createdUser
  }

  async getUser(userId: string){
    return await this.userModel.findById(userId);
  }
}