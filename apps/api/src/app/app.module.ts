import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FitnessAppAppModelsModule } from '@fitness-app/app-models';
import { UsersModule } from '@fitness-app/users';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FitnessAppAppModelsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
