import { Player } from 'src/players/interfaces/player.interface';

export interface Challenge extends Document {
  readonly challenges: string;
  startDateChallenge: string;
  startDateRequest: string;
  startDateResponse: string;
  request: string;
  category: string;
  status: string;
  players: Array<Player>;
}
