import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FiskDragService } from './fiskdrag.service';
import { CreateFiskDragDto } from './dto/create-fiskdrag';
import { FiskDrag } from './schemas/fiskdrag.schemas';
import { UpdateFiskDragDto } from './dto/update-fiskdrag';

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

  @Post(':id')
  async update(@Param('id') id: string, @Body() UpdateFiskDragDto: UpdateFiskDragDto) {
    return this.fiskDragService.update(id, UpdateFiskDragDto);
  }

   @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.fiskDragService.delete(id);
  }
}
