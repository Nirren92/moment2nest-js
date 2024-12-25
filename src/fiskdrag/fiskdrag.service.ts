
import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try
    {    
      //kontrollerar om artikelnummer finns
      const existingFiskDrag = await this.fiskdragModel.findOne({
        artikelnummer: createFiskdragDto.artikelnummer,
      });

      //den fanns. retunerar felkod. 
      if(existingFiskDrag)
      {
        throw new HttpException("Artikelnummer är inte unikt. finns redan.",HttpStatus.BAD_REQUEST)
      }

      const createFiskDrag = new this.fiskdragModel(createFiskdragDto);
      return createFiskDrag.save();
    } 
    catch(error)
    {
      console.error("nåt gick fel vid skapandet.",error);
      throw new HttpException("nåt gick fel i skapandet",HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // retunerar alla objekt som finns i mongodb databasen
  async findAll(): Promise<FiskDrag[]> {
    return this.fiskdragModel.find().exec();
  }

  // Söker reda på ID och uppdaterar dens data. 
  async update(id: string, UpdateFiskDragDto: UpdateFiskDragDto): Promise<FiskDrag> {
    try
    {
      
      const existingFiskDrag = await this.fiskdragModel.findOne({
        artikelnummer: UpdateFiskDragDto.artikelnummer,
      });

      if(existingFiskDrag)
      {
        throw new Error("Artikelnummer är inte unikt. finns redan.")
      }
      
      return this.fiskdragModel
      .findByIdAndUpdate({ _id: id }, UpdateFiskDragDto, { new: true })
      .exec();
    
    }
    catch(error)
    {

    }
  }

  // kontrollerar mot ID att det finns. det som kontrolleras är det interna som mongodb skapar. finns det så tas det bort. 
  async delete(id: string): Promise<FiskDrag> {
    const deleteFiskdrag = await this.fiskdragModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deleteFiskdrag;
  }


}
