import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSubProductDto } from './dto/create-sub-product.dto';
import { UpdateSubProductDto } from './dto/update-sub-product.dto';
import { SubProductsService } from './sub-products.service';

@ApiTags('sub-products')
@Controller('sub-products')
export class SubProductsController {
  constructor(private readonly subProductsService: SubProductsService) {}

  @Post()
  create(@Body() createSubProductDto: CreateSubProductDto) {
    return this.subProductsService.create(createSubProductDto);
  }

  @Get()
  findAll() {
    return this.subProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubProductDto: UpdateSubProductDto,
  ) {
    return this.subProductsService.update(+id, updateSubProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subProductsService.remove(+id);
  }
}
