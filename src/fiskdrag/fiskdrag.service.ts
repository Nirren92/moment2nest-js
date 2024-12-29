import { Model, Types } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FiskDrag } from './schemas/fiskdrag.schemas';
import { CreateFiskDragDto } from './dto/create-fiskdrag';
import { UpdateFiskDragDto } from './dto/update-fiskdrag';


@Injectable()
export class FiskDragService {
  constructor(@InjectModel(FiskDrag.name) private fiskdragModel: Model<FiskDrag>) {}

  //Skapar ett nytt obejekt.
  async create(createFiskdragDto: CreateFiskDragDto): Promise<FiskDrag> {
    try
    {    

      //kontrollerar så inte det finns redan
      const checkFiskeDrag = await this.fiskdragModel.findOne({artikelnummer:createFiskdragDto.artikelnummer}).exec();
      if(checkFiskeDrag)
      {
        throw new HttpException('artikelnummer finns redan',HttpStatus.BAD_REQUEST);
      }

      //draget finns inte så detta skickas in i databasen-
      const createFiskDrag = new this.fiskdragModel(createFiskdragDto);
      return createFiskDrag.save();
    } 
    catch(error)
    {
      console.error('Fel vid skapandet av FiskDrag:', error);
      throw error;
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
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('ingen korrekt mongodb _id', HttpStatus.BAD_REQUEST);
      }
      
      // kontrollerar så inget annat objekt redan har ifall artikelnummer ska bytas. detta görs endast om artikelnummer skickas med.
      if (UpdateFiskDragDto.artikelnummer) 
      {
        const existingFiskDrag = await this.fiskdragModel.findOne({artikelnummer:UpdateFiskDragDto.artikelnummer, _id:{$ne:id}}).exec();
        //kontrollerar om det fanns. finns det så kan vi inte uppdatera det berört Id med det nya artikelnummeret. 
        if (existingFiskDrag) {
          throw new HttpException(
            `artikelnummmer är redan använt`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const updateFiskdrag = await this.fiskdragModel.findByIdAndUpdate({_id:id},UpdateFiskDragDto,{new:true}).exec();

      if(!updateFiskdrag)
        {
          throw new HttpException('id finns inte',HttpStatus.BAD_REQUEST);
        }
    return updateFiskdrag;

    }
    catch(error)
    {
      
      throw error;
    }
  }

  // kontrollerar mot ID att det finns. det som kontrolleras är det interna som mongodb skapar. finns det så tas det bort. 
  async delete(id: string): Promise<FiskDrag> 
  {
    try
    {
      //kontrollerar att det är ett korrekt ID
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpException('ingen korrekt mongodb _id', HttpStatus.BAD_REQUEST);
      }

      //raderar id
      const deleteFiskdrag = await this.fiskdragModel.findByIdAndDelete({_id:id }).exec();

      //kontrollerar att det gått bra. har det inte gått så finns inte id
      if(!deleteFiskdrag)
        {
          throw new HttpException('id finns inte',HttpStatus.BAD_REQUEST);
        }
      return deleteFiskdrag;

    }
    catch(error)
    {
      
      throw error;
    }
  }


}
