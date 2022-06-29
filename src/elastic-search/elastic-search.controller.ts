import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ElasticSearchService } from './elastic-search.service';
import { CreateElasticSearchDto } from './dto/create-elastic-search.dto';
import { UpdateElasticSearchDto } from './dto/update-elastic-search.dto';

@Controller('elastic-search')
export class ElasticSearchController {
  constructor(private readonly elasticSearchService: ElasticSearchService) {}

  @Post()
  create(@Body() createElasticSearchDto: CreateElasticSearchDto) {
    return this.elasticSearchService.create(createElasticSearchDto);
  }

  @Get()
  findAll() {
    return this.elasticSearchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elasticSearchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateElasticSearchDto: UpdateElasticSearchDto,
  ) {
    return this.elasticSearchService.update(+id, updateElasticSearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elasticSearchService.remove(+id);
  }
}
