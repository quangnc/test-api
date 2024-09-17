import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'modules/auth/entities/user.entity';
import { enumValues } from 'src/utils/array';

export enum ArticleTypes {
  topic = 'topic',
  discover = 'discover',
  news = 'news',
  howto = 'howto',
  review = 'review',
}

@Entity('articles')
export class Article extends TimeEntity {
  @Column({ unique: true })
  slug: string;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column({ default: 0 })
  views: number;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ enum: enumValues(ArticleTypes) })
  type: string;

  @Column()
  locale: string;

  @Column()
  description: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  seoKeywords: string;

  @Column({ nullable: true })
  seoDescription: string;

  @ManyToOne(() => User, (u) => u.articles)
  @JoinColumn({ name: 'userId' })
  author: User;
}
