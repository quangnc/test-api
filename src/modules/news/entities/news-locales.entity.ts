import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AutoIdEntity } from 'src/common/base-entity';
import { News } from './news.entity';

@Entity('news_locales')
@Index(['newsId', 'locale'], { unique: true })
export class NewsLocales extends AutoIdEntity {
  @Column()
  public newsId: number;

  @Column({ enum: ['en', 'vi'] }) // Extend with more languages as needed
  locale: string;

  @Column()
  public title: string;

  @Column('text')
  public content: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public keyword_description: string;

  @Column({ nullable: true })
  public keywords: string;

  @Column({ nullable: true })
  public keyword_title: string;

  @ManyToOne(() => News, (news) => news.locales)
  @JoinColumn({ name: 'newsId' })
  news: News;
}
