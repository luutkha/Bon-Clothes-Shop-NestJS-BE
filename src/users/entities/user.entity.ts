import { BaseEntity } from 'src/base-entity/entities/base-entity.entity';
import { Otp } from 'src/otps/entities/otp.entity';
import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  username: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @OneToMany(() => Otp, (otp) => otp.user)
  otps: Otp;
}
