import { Module } from '@nestjs/common';
import { GameController } from './game.controller';  
import { GameService } from './game.service';
import { PoolGame, PoolGameSchema, PoolPlayer, PoolRating, PoolRatingSchema, PoolPlayerSchema } from './game.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GameDao } from './game.dao';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: PoolGame.name, schema: PoolGameSchema }]),
    MongooseModule.forFeature([{ name: PoolPlayer.name, schema: PoolPlayerSchema }]),
    MongooseModule.forFeature([{ name: PoolRating.name, schema: PoolRatingSchema }]),
  ],
  controllers: [GameController],
  providers: [GameService, GameDao],
  exports: [GameService],
})
export class UserModule {}
