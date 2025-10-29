import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { Challengeschema } from './interfaces/challenges.schema';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'challenge', schema: Challengeschema }]),
    PlayersModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class ChallengesModule {}
