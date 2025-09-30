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
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';
import { PlayersService } from './players.service';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Controller('/api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() data: CreatePlayerDto) {
    return await this.playersService.createPlayer(data);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() data: UpdatePlayerDto,
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ) {
    return await this.playersService.updatePlayer(data, _id);
  }

  @Get()
  async list() {
    return await this.playersService.list();
  }

  @Get('/:_id')
  async playerById(@Param('_id', PlayersValidationParamsPipe) _id: string) {
    return await this.playersService.playerById(_id);
  }
}
