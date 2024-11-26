import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FiskDrag } from './fiskdrag/schemas/fiskdrag.schemas';
import { FiskDragModule } from './fiskdrag/fiskdrag.module';

@Module({
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot("mongodb+srv://nibor:MongoDB1@moment1dt209g.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000"),FiskDragModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
