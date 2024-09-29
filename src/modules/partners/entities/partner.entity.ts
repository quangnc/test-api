import { Column, Entity } from 'typeorm';
import { TimeEntity } from 'src/common/base-entity';

@Entity('partners')
export class Partner extends TimeEntity {
  @Column()
  public name_vi: string;

  @Column()
  public name_en: string;

  @Column('text', { nullable: true })
  public description: string;

  @Column()
  public url: string;

  @Column({ nullable: true })
  public image: string;

  @Column({ default: true })
  public isActive: boolean;
}
