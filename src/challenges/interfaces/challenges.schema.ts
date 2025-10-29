import * as mongoose from 'mongoose';

export const Challengeschema = new mongoose.Schema(
  {
    startDateChallenge: { type: Date },
    startDateRequest: { type: String },
    startDateResponse: { type: String },
    request: { type: String },
    category: { type: String },
    status: { type: String },
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
      },
    ],
  },
  { timestamps: true, collection: 'challenges' }
);
