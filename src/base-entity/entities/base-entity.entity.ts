import { Column } from 'typeorm';

export class BaseEntity {
  @Column()
  createdDate: Date;
  @Column()
  updatedDate: Date;
  @Column()
  isDeteled: boolean;
}
