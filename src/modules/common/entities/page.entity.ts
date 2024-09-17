import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity } from 'typeorm';
import { enumValues } from 'src/utils/array';

export enum PageType {
  aboutUs = 'aboutUs',
  privacyPolicy = 'privacyPolicy',
  contact = 'contact',
  termsOfUse = 'termsOfUse',
}

@Entity('pages')
export class Page extends AutoIdEntity {
  @Column()
  title: string;

  @Column({ enum: enumValues(PageType), unique: true })
  page: string;

  @Column()
  locale: string;

  @Column({ nullable: true })
  seoKeywords: string;

  @Column({ nullable: true })
  seoDescription: string;

  @Column({ type: 'text' })
  content: string;
}
