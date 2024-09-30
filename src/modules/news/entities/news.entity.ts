import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsLocales } from './news-locales.entity';

@Entity('news')
export class News extends BaseEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  public id: number;

  @Column()
  public url: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => NewsLocales, (nl) => nl.news, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  locales: NewsLocales[];

  get locale(): NewsLocales | null {
    return this.locales && this.locales.length ? this.locales[0] : null;
  }
}
