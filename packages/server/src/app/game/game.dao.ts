import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
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
    return await this.gameModel.find().populate("winner").populate("loser").limit(30);
  }

  async getAllPlayerGames(playerId: string) {
    return await this.gameModel.find({ $or: [ { winner: playerId }, { loser: playerId } ] })
  }

  async getPlayerFromUser(userId: string) {
    return await this.playerModel.findOne({ user: userId })
  }

  async getAllPlayers(){
    const results = await this.playerModel.find();
    return results
  }

  async createGame(input: createGameDto) {
    const winner = await this.playerModel.findById(input.winner)
    const loser = await this.playerModel.findById(input.loser)

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
    let results: any[] = []
    const allPlayers = await this.getAllPlayers();
    
    for (let i=0; i<allPlayers.length; i++) {
      const currentrating = await this.ratingModel
      .findOne({ "player": allPlayers[i]._id})
      .populate('player')
      .sort({ "createdAt": "desc" })
      
      results.push(currentrating)
    }
    return results
  }

  async getSecondMostRecentRatings() {
    const results: PoolRating[] = []
    const allPlayers = await this.getAllPlayers();

    for (let i=0; i<allPlayers.length; i++) {
      const previousrating = await this.ratingModel
      .findOne({ "player": allPlayers[i]._id})
      .populate('player')
      .sort({ "createdAt": "desc" })
      .skip(1);

      if(previousrating) {
        results.push(previousrating)
      }
    }
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
    const result = await this.ratingModel
      .findOne({ "player": playerId })
      .sort({ "createdAt": "desc" })
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