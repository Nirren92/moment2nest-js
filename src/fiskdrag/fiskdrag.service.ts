
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FiskDrag } from './schemas/fiskdrag.schemas';
import { CreateFiskDragDto } from './dto/create-fiskdrag';


@Injectable()
export class FiskDragService {
  constructor(@InjectModel(FiskDrag.name) private fiskdragModel: Model<FiskDrag>) {}

  async create(createFiskdragDto: CreateFiskDragDto): Promise<FiskDrag> {
    const createdFiskDrag = new this.fiskdragModel(createFiskdragDto);
    return createdFiskDrag.save();
  }

  async findAll(): Promise<FiskDrag[]> {
    return this.fiskdragModel.find().exec();
  }
}
