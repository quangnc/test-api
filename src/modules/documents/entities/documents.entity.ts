import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('documents')
export class Documents extends AutoIdEntity {
  @Column()
  url: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;
}
