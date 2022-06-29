import { BaseEntity } from 'src/base-entity/entities/base-entity.entity';
import { ProductType } from 'src/product-types/entities/product-type.entity';
import { SubProduct } from 'src/sub-products/entities/sub-product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => ProductType, (type) => type.product)
  type: ProductType;
  @Column()
  basePrice: number;
  @Column()
  description: string;

  @OneToMany(() => SubProduct, (sub) => sub.product, {
    cascade: true,
  })
  subProducts: SubProduct[];
}
