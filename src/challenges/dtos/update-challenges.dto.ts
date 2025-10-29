import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateChallengesDto {
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
}
