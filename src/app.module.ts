import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategorysModule } from './categorys/categorys.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),

    PlayersModule,
    CategorysModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
