import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../user/user.schema';



@Schema()
export class PoolPlayer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  createdAt: Date;
}

@Schema()
export class PoolGame {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PoolPlayer' })
  winner: PoolPlayer;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PoolPlayer' })
  loser: PoolPlayer;
  
  @Prop({ required: true })
  date: Date;
}


@Schema()
export class PoolRating {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PoolPlayer' })
  player: PoolPlayer;
  
  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  rating: number;
}

export type PoolGameDocument = PoolGame & Document;
export type PoolPlayerDocument = PoolPlayer & Document;
export type PoolRatingDocument = PoolRating & Document;


export const PoolGameSchema = SchemaFactory.createForClass(PoolGame);
export const PoolPlayerSchema = SchemaFactory.createForClass(PoolPlayer);
export const PoolRatingSchema = SchemaFactory.createForClass(PoolRating);