import { Column, Entity, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity('articles_apks')
export class ArticleApk extends BaseEntity {
  @Column()
  @PrimaryColumn()
  apkId: number;

  @Column()
  @PrimaryColumn()
  articleId: number;

  @Column({ default: 1 })
  rank: number;
}
