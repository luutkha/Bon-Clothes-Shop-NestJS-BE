import { PartialType } from '@nestjs/swagger';
import { CreateElasticSearchDto } from './create-elastic-search.dto';

export class UpdateElasticSearchDto extends PartialType(CreateElasticSearchDto) {}
