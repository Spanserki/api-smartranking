import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { ChallengesValidationParamsPipe } from './pipes/challenges-validation-params.pipe';
import { CreateChallengesDto } from './dtos/create-challenges.dto';
import { UpdateChallengesDto } from './dtos/update-challenges.dto';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async list() {
    return await this.challengesService.list();
  }

  @Get('/:_id')
  async playerById(@Param('_id', ChallengesValidationParamsPipe) _id: string) {
    return await this.challengesService.categoryById(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createChallengeDto: CreateChallengesDto) {
    return await this.challengesService.createChallenges(createChallengeDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() data: UpdateChallengesDto,
    @Param('_id', ChallengesValidationParamsPipe) _id: string
  ) {
    return await this.challengesService.updateCategory(data, _id);
  }

  @Post('/:category/player/:idPlayer')
  async assignCategoryPlayer(@Param() params: string[]) {
    return await this.challengesService.assignCategoryPlayer(params);
  }
}
