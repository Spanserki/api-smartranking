import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';
import { CategorySchema } from './interfaces/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'category', schema: CategorySchema }]),
    PlayersModule,
  ],
  controllers: [CategorysController],
  providers: [CategorysService],
})
export class CategorysModule {}
