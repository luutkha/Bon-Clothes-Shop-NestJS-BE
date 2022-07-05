import { BaseEntity } from 'src/base-entity/entities/base-entity.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Otp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  otp: string;
  type: number;
  @ManyToOne(() => User, (user) => user.otps)
  user: User;
}
