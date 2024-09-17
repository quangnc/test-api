import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('keywords')
export class Keyword extends TimeEntity {
  @Column()
  public keyword: string;

  @Column()
  public searchCount: number;

  @Column()
  public resultCount: number;
}
