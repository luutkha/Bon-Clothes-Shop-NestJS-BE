import { BaseEntity } from 'src/base-entity/entities/base-entity.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Otp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  otp: string;
  @Column()
  type: number;
  @ManyToOne(() => User, (user) => user.otps)
  @JoinColumn({ name: 'user_name' })
  user: User;
}
