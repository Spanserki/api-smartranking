import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Player } from 'src/players/interfaces/player.interface';

@Injectable()
export class CategorysService {
  constructor(
    @InjectModel('category')
    private readonly categoryModel: Model<Category>,

    @InjectModel('player')
    private readonly playerModel: Model<Player>,
  ) {}

  async list() {
    return await this.categoryModel.find().populate('players');
  }

  async categoryById(_id: string) {
    const res = await this.categoryModel.findOne({ _id });
    if (!res) {
      throw new HttpException('Categoria não encontrada', 404);
    }
    return res;
  }

  async createCategory(data: CreateCategoryDto) {
    const { category } = data;

    const findCategory = await this.categoryModel.findOne({ category });

    if (findCategory) {
      throw new HttpException('Categoria já existe', 404);
    }

    const createCategory = new this.categoryModel(data);

    return await createCategory.save();
  }

  async updateCategory(data: UpdateCategoryDto, _id: string) {
    const findCategory = await this.categoryModel.findOne({ _id });

    if (!findCategory) {
      throw new HttpException('Categoria não encontrada', 404);
    }

    try {
      return await this.categoryModel
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

    const findCategory = await this.categoryModel.findOne({
      category: categoryId,
    });

    if (!findCategory) {
      throw new HttpException('Categoria não encontrada', 404);
    }

    const findPlayerByCategory = await this.categoryModel
      .findOne({
        category: categoryId,
      })
      .where('players')
      .in(idPlayer);

    if (findPlayerByCategory) {
      throw new HttpException('Jogador já cadastrado nessa categoria', 404);
    }

    findCategory.players.push(idPlayer);

    return await this.categoryModel.findByIdAndUpdate(
      { _id: findCategory._id },
      { $set: findCategory },
    );
  }
}
