import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';

export class CreateChallengesDto {
  @IsString()
  @IsNotEmpty()
  readonly startDateChallenge: string;

  @IsString()
  @IsNotEmpty()
  readonly startDateRequest: string;

  @IsString()
  @IsNotEmpty()
  readonly startDateResponse: string;

  @IsString()
  @IsNotEmpty()
  readonly request: string;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly players: Array<Player>;
}
