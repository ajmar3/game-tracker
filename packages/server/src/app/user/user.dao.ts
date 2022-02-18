import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { createUserDto } from "./user.models";
import { User, UserDocument } from "./user.schema";


@Injectable()
export class UserDao {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

  async getAll(){
    return await this.userModel.find();
  }

  async createUser(input: createUserDto, hashedPassword: string) {
    
    const modelInput = {
      "firstName": input.firstName,
      "lastName": input.lastName,
      "email": input.email,
      "isAdmin": input.isAdmin,
      "passwordHash": hashedPassword,
    }

    const createdUser = new this.userModel(modelInput)
  
    await createdUser.save();
  
    return createdUser
  }

  async getUserById(userId: string){
    return await this.userModel.findById(userId);
  }

  async getUserByEmail(email: string){
    console.log(email)
    return await this.userModel.findOne({ email: email });
  }
  
}