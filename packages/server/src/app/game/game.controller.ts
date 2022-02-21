import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createGameDto } from './game.models';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('all')
  async getAllGames() {
    return await this.gameService.getAllGames();
  }

  @Get('rankings')
  async getRankingInfo() {
    return await this.gameService.getRankingInfo();
  }


  @Post('create')
  async newUser(@Body() input: createGameDto) {
    return await this.gameService.createGame(input);
  }

  // @Get(':id')
  // async getUser(@Param("id") userId: string) {
  //   return await this.userService.getUserById(userId);
  // }
}
