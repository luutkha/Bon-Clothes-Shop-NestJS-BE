import { BaseEntity } from 'src/base-entity/entities/base-entity.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column(() => BaseEntity)
  detail: BaseEntity;
}
