import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('certificate')
export class Certificate extends TimeEntity {
  @Column()
  public number: string;

  @Column()
  public organization: string;

  @Column()
  public standards: string;

  @Column('text')
  public scope: string;

  @Column()
  public start_date: Date;

  @Column()
  public end_date: Date;

  @Column('text')
  public description: string;

  @Column({ default: 1 })
  isActive: number;
}
