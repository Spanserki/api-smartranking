import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from './interfaces/player.interface';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('player') private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(data: CreatePlayerDto) {
    const { email } = data;

    const findPlayer = await this.playerModel.findOne({ email }).exec();

    if (findPlayer) {
      throw new HttpException('Esse e-mail já existe', 404);
    }
    try {
      const playerData = new this.playerModel(data);

      await playerData.save();

      return new HttpException('Success!', HttpStatus.CREATED);
    } catch (error) {
      return error;
    }
  }

  async updatePlayer(data: UpdatePlayerDto, _id: string) {
    const findPlayer = await this.playerModel.findOne({ _id });

    if (!findPlayer) {
      throw new HttpException('Usuário não encontrado', 404);
    }
    try {
      return await this.playerModel
        .findByIdAndUpdate({ _id }, { $set: data })
        .exec();
    } catch (error) {
      return error;
    }
  }

  async list() {
    return await this.playerModel.find();
  }

  async playerById(_id: string) {
    const res = await this.playerModel.findOne({ _id });
    if (!res) {
      throw new HttpException('Usuário não encontrado', 404);
    }
    return res;
  }
}
