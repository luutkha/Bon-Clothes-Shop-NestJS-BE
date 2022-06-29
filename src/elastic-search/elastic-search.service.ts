import { Injectable } from '@nestjs/common';
import { CreateElasticSearchDto } from './dto/create-elastic-search.dto';
import { UpdateElasticSearchDto } from './dto/update-elastic-search.dto';

@Injectable()
export class ElasticSearchService {
  // constructor(private readonly elasticsearchService: ElasticSearchService) {}

  create(createElasticSearchDto: CreateElasticSearchDto) {
    return 'This action adds a new elasticSearch';
  }

  findAll() {
    return `This action returns all elasticSearch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} elasticSearch`;
  }

  update(id: number, updateElasticSearchDto: UpdateElasticSearchDto) {
    return `This action updates a #${id} elasticSearch`;
  }

  remove(id: number) {
    return `This action removes a #${id} elasticSearch`;
  }
}
