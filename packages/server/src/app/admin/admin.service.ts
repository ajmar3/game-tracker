import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { GameDao } from '../game/game.dao';
import { createPlayerDto } from '../game/game.models';
import { UserDao } from '../user/user.dao';
import { createUserDto } from '../user/user.models';

const bcrypt = require('bcrypt')

@Injectable()
export class AdminService{
  constructor(
    private userDao: UserDao,
    private gameDao: GameDao
  ) {}

  async createUser(input: createUserDto) {
    const existingUser = await this.userDao.getUserByEmail(input.email);
    
    const emailDomain = input.email.substring(input.email.indexOf("@"))

    if (emailDomain != "@mps-data.co.uk")
      throw new BadRequestException("Please enter a valid email")
    
    if (existingUser)
      throw new ConflictException("User with this email already exists");

    const hashedPassword = await bcrypt.hash(input.password, 14)
    const createdUser = await this.userDao.createUser(input, hashedPassword)

    return createdUser
  }

  async createPlayer(input: createPlayerDto) {
    const existingPlayer = await this.gameDao.getPlayerFromUser(input.userId)

    if (existingPlayer)
      throw new ConflictException("Player for this user already exists")

    const user = await this.userDao.getUserById(input.userId)

    if (!user)
      throw new BadRequestException(`User with id: ${input.userId} does not exist`)

    const name = `${user.firstName} ${user.lastName}`
    const createdPlayer = await this.gameDao.createPlayer(user, name, input.date)

    return createdPlayer
  }

}
