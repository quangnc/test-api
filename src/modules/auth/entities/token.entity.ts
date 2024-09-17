import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Token extends TimeEntity {
  @Column()
  code: string;

  @Column()
  key: string;

  @Column()
  valid_until: Date;

  @Column()
  content: string;
}
