import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubProduct {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  size: string;
  @Column()
  color: string;

  @ManyToOne(() => Product, (product) => product.subProducts)
  product: Product;
}
