import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String },
    email: { type: String, unique: true },
    name: { type: String },
    ranking: { type: String },
    urlSelfPlayer: { type: String },
    positionRanking: { type: Number },
  },
  { timestamps: true, collection: 'players' },
);
