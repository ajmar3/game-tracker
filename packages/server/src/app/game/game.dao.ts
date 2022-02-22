import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../user/user.schema";
import { createGameDto, createPlayerDto } from "./game.models";
import { PoolGame, PoolGameDocument, PoolPlayer, PoolPlayerDocument, PoolRating, PoolRatingDocument } from "./game.schema";


@Injectable()
export class GameDao{
  constructor(
    @InjectModel(PoolGame.name)private gameModel: Model<PoolGameDocument>,
    @InjectModel(PoolPlayer.name)private playerModel: Model<PoolPlayerDocument>,
    @InjectModel(PoolRating.name)private ratingModel: Model<PoolRatingDocument>,
    ) {}

  async getAllGames(){
    return await this.gameModel.find().limit(30);
  }

  async getAllPlayerGames(playerId: string) {
    return await this.gameModel.find({ $or: [ { winner: playerId }, { loser: playerId } ] })
  }

  async getPlayerFromUser(userId: string) {
    return await this.playerModel.findOne({ user: userId })
  }

  async getAllPlayers(){
    return await this.playerModel.find();
  }

  async createGame(input: createGameDto) {
    const winner = this.playerModel.findById(input.winner)
    const loser = this.playerModel.findById(input.loser)

    if (!winner || !loser)
      throw new NotFoundException("Could not find user with given id");

    const modelInput = {
      "winner": winner,
      "loser": loser,
      "date": input.date
    }
    const createdGame = await this.gameModel.create(modelInput)
    await createdGame.save()
  
    return createdGame
  }

  async getMostRecentRatings() {
    const results: PoolRating[] = []
    const allPlayers = await this.getAllPlayers();

    allPlayers.forEach(async player => {
      const currentrating = await this.ratingModel
      .findOne({ "player": player.id })
      .populate("player")
      .sort({ "createdAt": "desc" })
      .limit(1);
    
      results.push(currentrating)
    })

    return results
  }

  async getSecondMostRecentRatings() {
    const results: PoolRating[] = []
    const allPlayers = await this.getAllPlayers();

    allPlayers.forEach(async player => {
      const previousrating = await this.ratingModel
        .findOne({ "player": player.id })
        .populate("player")
        .sort({ "createdAt": "desc" })
        .skip(1);
      
      results.push(previousrating)
    })

    return results
  }

  async createPlayer(user: User, name: string, date: Date) {
    const inputModel = {
      "user": user,
      "name": name,
      "createdAt": date
    }
    const createdPlayer = await this.playerModel.create(inputModel)
    return createdPlayer
  }

  async getPlayerRating(playerId: string){
    const result = await this.ratingModel.findOne({ "player": playerId });
    return result
  }

  async createNewRating(playerId: string, ratingDate: Date, newRating: number){
    const modelInput = {
      "player": playerId,
      "createdAt": ratingDate,
      "rating": newRating
    }

    const createdRating = await this.ratingModel.create(modelInput)

    return createdRating
  }
  
}