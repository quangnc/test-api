import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('contacts')
export class Contact extends AutoIdEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  reason: string;

  @Column()
  subject: string;

  @Column()
  message: string;
}
