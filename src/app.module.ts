import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FiskDrag } from './fiskdrag/schemas/fiskdrag.schemas';
import { FiskDragModule } from './fiskdrag/fiskdrag.module';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot("mongodb+srv://nirren92:g6qmlQCUwQfAO4bR@cluster0.amxvj.mongodb.net/"),FiskDragModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
