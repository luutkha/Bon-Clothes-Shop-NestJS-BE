import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StringHelper } from 'src/common/function/StringHelper';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';

@Injectable()
export class ProductTypesService {
  private stringHelper = new StringHelper();

  constructor(
    @InjectRepository(ProductType)
    private productTypeRepository: Repository<ProductType>,
  ) {}
  importDummyData() {
    const dummyTypes = [
      'Quần ống suông',
      'Quần ống loe',
      ' quần da',
      'quần đùi',
      'quần lửng',
      'quần jeans',
      'quần tây',
    ];
    dummyTypes.forEach((t) => {
      const productType: ProductType = new ProductType();
      productType.displayName = t;
      productType.name = this.stringHelper
        .removeVietnameseTones(t)
        .replace(/ /g, '');
      this.productTypeRepository.save(productType);
    });
    return 'Import data success';
  }

  create(createProductTypeDto: CreateProductTypeDto) {
    return 'This action adds a new productType';
  }

  findAll() {
    return this.productTypeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} productType`;
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return `This action updates a #${id} productType`;
  }

  remove(id: number) {
    return `This action removes a #${id} productType`;
  }
}
