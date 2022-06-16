import { Module } from '@nestjs/common';
import { SubProductsService } from './sub-products.service';
import { SubProductsController } from './sub-products.controller';
import { SubProduct } from './entities/sub-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubProduct])],
  exports: [TypeOrmModule],
  controllers: [SubProductsController],
  providers: [SubProductsService],
})
export class SubProductsModule {}
