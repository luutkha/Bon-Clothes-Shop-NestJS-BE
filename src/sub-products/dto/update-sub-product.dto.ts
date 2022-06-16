import { PartialType } from '@nestjs/mapped-types';
import { CreateSubProductDto } from './create-sub-product.dto';

export class UpdateSubProductDto extends PartialType(CreateSubProductDto) {}
