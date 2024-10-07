import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsLocales } from './news-locales.entity';
import { TimeEntity } from 'src/common/base-entity';

@Entity('news')
export class News extends TimeEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  public id: number;

  @Column()
  public url: string;

  @Column({ nullable: true, default: 0 })
  public count: number;

  @Column({ nullable: true, default: 1 })
  public type: number;

  @Column({ default: 1 })
  isActive: number;

  @OneToMany(() => NewsLocales, (nl) => nl.news, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  locales: NewsLocales[];

  get locale(): NewsLocales | null {
    return this.locales && this.locales.length ? this.locales[0] : null;
  }
}
