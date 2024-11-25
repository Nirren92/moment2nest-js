import { Body, Controller, Get, Post } from '@nestjs/common';
import { FiskDragService } from './fiskdrag.service';
import { CreateFiskDragDto } from './dto/create-fiskdrag';
import { FiskDrag } from './schemas/fiskdrag.schemas';

@Controller('fiskdrag')
export class FiskDragController {
  constructor(private readonly fiskDragService: FiskDragService) {}

  @Post()
  async create(@Body() createFiskDragDto: CreateFiskDragDto): Promise<FiskDrag> {
    return this.fiskDragService.create(createFiskDragDto);
  }

  @Get()
  async findAll(): Promise<FiskDrag[]> {
    return this.fiskDragService.findAll();
  }
}
