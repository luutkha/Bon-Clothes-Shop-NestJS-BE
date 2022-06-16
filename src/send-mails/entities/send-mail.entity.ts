import { User } from 'src/users/entities/user.entity';
import { Entity } from 'typeorm';

@Entity()
export class SendMail {
  id: number;
  toUser: User;
  type: string;
  otp: string;
  isComplete: boolean;
}
