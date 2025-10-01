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
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategorysService } from './categorys.service';
import { CategorysValidationParamsPipe } from './pipes/categorys-validation-params.pipe';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('api/v1/categorys')
export class CategorysController {
  constructor(private readonly categoryService: CategorysService) {}

  @Get()
  async list() {
    return await this.categoryService.list();
  }

  @Get('/:_id')
  async playerById(@Param('_id', CategorysValidationParamsPipe) _id: string) {
    return await this.categoryService.categoryById(_id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() data: UpdateCategoryDto,
    @Param('_id', CategorysValidationParamsPipe) _id: string,
  ) {
    return await this.categoryService.updateCategory(data, _id);
  }

  @Post('/:category/player/:idPlayer')
  async assignCategoryPlayer(@Param() params: string[]) {
    return await this.categoryService.assignCategoryPlayer(params);
  }
}
