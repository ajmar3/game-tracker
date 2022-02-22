export type createGameDto = {
  winner: string
  loser: string
  date: Date
}

export type createPlayerDto = {
  userId: string
  date: Date
}

export type ratingRankingInfo = {
  playerName: string,
  rating: number,
  lastChange: number,
  ranking: number
}

export type myGameInfo = {
  totalGames: number,
  winPercentage: number,
  ranking: number
}