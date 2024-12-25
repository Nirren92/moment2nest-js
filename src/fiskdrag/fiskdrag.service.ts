
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FiskDrag } from './schemas/fiskdrag.schemas';
import { CreateFiskDragDto } from './dto/create-fiskdrag';
import { promises } from 'dns';
import { UpdateFiskDragDto } from './dto/update-fiskdrag';


@Injectable()
export class FiskDragService {
  constructor(@InjectModel(FiskDrag.name) private fiskdragModel: Model<FiskDrag>) {}

  //Skapar ett nytt obejekt.ville få det att fungera med att ha unikt på ett fält i mongodb schema men fick inte det att fungera. vet inte om det azure eller jag så jag löser det genom en "manuell kontroll"
  async create(createFiskdragDto: CreateFiskDragDto): Promise<FiskDrag> {
    
    const existingFiskDrag = await this.fiskdragModel.findOne({
      artikelnummer: createFiskdragDto.artikelnummer,
    });

    if(existingFiskDrag)
    {
      throw new Error("Artikelnummer är inte unikt. finns redan.")
    }

    const createFiskDrag = new this.fiskdragModel(createFiskdragDto);
    return createFiskDrag.save();
  }

  // retunerar alla objekt som finns i mongodb databasen
  async findAll(): Promise<FiskDrag[]> {
    return this.fiskdragModel.find().exec();
  }

  // Söker reda på ID och uppdaterar dens data. 
  async update(id: string, UpdateFiskDragDto: UpdateFiskDragDto): Promise<FiskDrag> {
    return this.fiskdragModel
    .findByIdAndUpdate({ _id: id }, UpdateFiskDragDto, { new: true })
    .exec();
  }

  // kontrollerar mot ID att det finns. det som kontrolleras är det interna som mongodb skapar. finns det så tas det bort. 
  async delete(id: string): Promise<FiskDrag> {
    const deleteFiskdrag = await this.fiskdragModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deleteFiskdrag;
  }


}
