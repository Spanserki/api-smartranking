import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { Challenge } from './interfaces/challenges.interface';
import { CreateChallengesDto } from './dtos/create-challenges.dto';
import { UpdateChallengesDto } from './dtos/update-challenges.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('challenge')
    private readonly challengeModel: Model<Challenge>,

    @InjectModel('player')
    private readonly playerModel: Model<Player>
  ) {}

  async list() {
    return await this.challengeModel.find().populate('players');
  }

  async categoryById(_id: string) {
    const res = await this.challengeModel.findOne({ _id });
    if (!res) {
      throw new HttpException('Desafio não encontrado', 404);
    }
    return res;
  }

  async createChallenges(data: CreateChallengesDto) {
    const createChallenge = new this.challengeModel(data);

    return await createChallenge.save();
  }

  async updateCategory(data: UpdateChallengesDto, _id: string) {
    const findCategory = await this.challengeModel.findOne({ _id });

    if (!findCategory) {
      throw new HttpException('Desafio não encontrado', 404);
    }

    try {
      return await this.challengeModel
        .findByIdAndUpdate({ _id }, { $set: data })
        .exec();
    } catch (error) {
      return error;
    }
  }

  async assignCategoryPlayer(params: string[]) {
    const categoryId = params['category'];
    const idPlayer = params['idPlayer'];

    const findPlayer = await this.playerModel.findOne({ _id: idPlayer });

    if (!findPlayer) {
      throw new HttpException('Usuário não encontrado', 404);
    }

    const findCategory = await this.challengeModel.findOne({
      category: categoryId,
    });

    if (!findCategory) {
      throw new HttpException('Desafio não encontrado', 404);
    }

    const findPlayerByCategory = await this.challengeModel
      .findOne({
        category: categoryId,
      })
      .where('players')
      .in(idPlayer);

    if (findPlayerByCategory) {
      throw new HttpException('Jogador já cadastrado nesse desafio', 404);
    }

    findCategory.players.push(idPlayer);

    return await this.challengeModel.findByIdAndUpdate(
      { _id: findCategory._id },
      { $set: findCategory }
    );
  }
}
