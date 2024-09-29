import { Column, Entity, OneToMany } from 'typeorm';
import { TimeEntity } from 'src/common/base-entity';
import { NewsLocales } from './news-locales.entity';

@Entity('news')
export class News extends TimeEntity {
  @Column()
  newsId: number;

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
