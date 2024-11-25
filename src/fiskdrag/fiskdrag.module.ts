
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FiskDragController } from './fiskdrag.controller';
import { FiskDragService } from './fiskdrag.service';
import { FiskDrag, FiskDragSchema } from './schemas/fiskdrag.schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: FiskDrag.name, schema: FiskDragSchema }])],
  
  controllers: [FiskDragController],
  providers: [FiskDragService],
})
export class FiskDragModule {}
