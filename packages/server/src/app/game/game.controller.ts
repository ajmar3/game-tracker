import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Admin } from '../auth/auth.decorators';
import { createGameDto, createPlayerDto } from './game.models';
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
  async createGame(@Body() input: createGameDto) {
    return await this.gameService.createGame(input);
  }

  @Get("me")
  async getUser(@Req() req) {
    return await this.gameService.getMyGameInfo(req.user.userId);
  }

}
