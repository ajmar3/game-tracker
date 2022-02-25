import { Injectable } from '@nestjs/common';
import { GameDao } from './game.dao';
import { createGameDto, gameInfoType, myGameInfo, playerInfoType, ratingRankingInfo } from './game.models';

@Injectable()
export class GameService{
  constructor(private gameDao: GameDao) {}

  async getAllGames(){
    const allGames = await this.gameDao.getAllGames();
    const results: gameInfoType[] = allGames.map(game => {
      return {
        winner: game.winner.name,
        loser: game.loser.name,
        date: game.date
      }
    })
    return results
  }

  async getAllPlayers(){
    const allPlayers = await this.gameDao.getAllPlayers();
    const results: playerInfoType[] = allPlayers.map((mongoPlayer: any) => {
      const nameWithInitials = mongoPlayer.name.split(" ")[0] + mongoPlayer.name.split(" ")[1].substr(0, 1)
      return {
        name: nameWithInitials,
        id: mongoPlayer._id
      }
    } )
    return results
  }

  async getRankingInfo(){
    const mostRecentRatings =  await this.gameDao.getMostRecentRatings();
    const secondMostRecentRatings =  await this.gameDao.getSecondMostRecentRatings();

    const results: ratingRankingInfo[] = []

    mostRecentRatings.forEach(rating => {
      const currentRating = rating.rating
      const previousRating = secondMostRecentRatings.find(secondRating => secondRating.player = rating.player).rating
      
      const rank = mostRecentRatings.sort((a, b) => b.rating - a.rating).indexOf(rating)

      const playerRatingRankingInfo: ratingRankingInfo = {
        playerName: rating.player.name,
        rating: rating.rating,
        lastChange: currentRating - previousRating,
        ranking: rank
      }

      results.push(playerRatingRankingInfo)
    })

    return results
  }

  async createGame(input: createGameDto) {
    const game = await this.gameDao.createGame(input);

    await this.createRatings(input);
  }

  async getMyGameInfo(userId: string) {
    const myPlayer = await this.gameDao.getPlayerFromUser(userId);
    const allMyGames = await this.gameDao.getAllPlayerGames(myPlayer._id)
    const gamesWon = allMyGames.filter(game => game.winner == myPlayer)
    const mostRecentRatings = await this.gameDao.getMostRecentRatings()
    const myRating = mostRecentRatings.find(rating => rating.player = myPlayer)

    const rank = mostRecentRatings.sort((a, b) => b.rating - a.rating).indexOf(myRating)

    const results: myGameInfo = {
      totalGames: allMyGames.length,
      winPercentage: allMyGames.length > 0 ? gamesWon.length / allMyGames.length * 100 : -1,
      ranking: rank
    }

    return results

  }

  private async createRatings(input: createGameDto){
    const winnerCurrentRating = await (await this.gameDao.getPlayerRating(input.winner)).rating
    const loserCurrentRating = await (await this.gameDao.getPlayerRating(input.loser)).rating

    const probWinnerWon = 1/(1+Math.pow(10, ((loserCurrentRating - winnerCurrentRating)/400)))
    const probLoserWon = 1/(1+Math.pow(10, ((winnerCurrentRating - loserCurrentRating)/400)))

    const winnerNewRating = winnerCurrentRating + 32*(1-probWinnerWon)
    const loserNewRating = loserCurrentRating + 32*(0-probLoserWon)

    await this.gameDao.createNewRating(input.winner, input.date, winnerNewRating)
    await this.gameDao.createNewRating(input.loser, input.date, loserNewRating)
  }

}
