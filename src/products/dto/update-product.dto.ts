import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { SubProduct } from 'src/sub-products/entities/sub-product.entity';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  name: string;
  @IsNumber()
  basePrice: number;
  type: ProductType;

  @IsString()
  description: string;
  @IsArray()
  subProducts: SubProduct[];
}
