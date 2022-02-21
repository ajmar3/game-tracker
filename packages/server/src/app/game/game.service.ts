import { Injectable } from '@nestjs/common';
import { GameDao } from './game.dao';
import { createGameDto, myGameInfo, ratingRankingInfo } from './game.models';

@Injectable()
export class GameService{
  constructor(private gameDao: GameDao) {}

  async getAllGames(){
    return await this.gameDao.getAllGames();
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
      winPercentage: gamesWon.length / allMyGames.length * 100,
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
