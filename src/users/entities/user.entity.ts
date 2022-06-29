import { BaseEntity } from 'src/base-entity/entities/base-entity.entity';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;
  @PrimaryColumn()
  username: string;
  @Column()
  password: string;
}
