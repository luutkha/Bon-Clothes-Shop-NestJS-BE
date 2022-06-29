import { Module } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';
import { ProductTypesController } from './product-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { StringHelper } from 'src/common/function/StringHelper';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType]), StringHelper],
  exports: [TypeOrmModule, ProductTypesService],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
})
export class ProductTypesModule {}
