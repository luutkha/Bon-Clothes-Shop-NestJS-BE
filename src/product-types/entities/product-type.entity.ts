import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base-entity/entities/base-entity.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  // Note: Below line dont show on swagger, need read document more!
  @ApiProperty({
    description: 'Auto mapping, cannot have value when create product type',
  })
  @OneToMany(() => Product, (product) => product.type)
  product: Product[];
  @Column()
  displayName: string;
}
