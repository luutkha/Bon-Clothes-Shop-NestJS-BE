import { IsArray, IsNotEmptyObject, IsNumber, IsString } from 'class-validator';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { SubProduct } from 'src/sub-products/entities/sub-product.entity';

export class CreateProductDto {
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
