import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApkInfo } from './apk-info.entity';
import { ApkScreenshot } from './apk-screenshot.entity';
import { ApkVersion } from './apk-version.entity';
import { Publisher } from 'modules/apks/entities/publisher.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { enumValues } from 'src/utils/array';

export enum ApkType {
  game = 'game',
  app = 'app',
}

@Entity('apks')
export class Apk extends TimeEntity {
  @Column()
  public slug: string;

  @Column({ unique: true })
  public packageName: string;

  @Column({ nullable: true })
  public publisherId: number;

  @Column({ nullable: true })
  public categoryId: number;

  @Column()
  public icon: string;

  @Column()
  public price: number;

  @Column({ default: '0MB' })
  public fileSize: string;

  @Column({ nullable: true })
  public salePrice: number;

  @Column({ nullable: true })
  public saleUntil: Date;

  @Column({ enum: enumValues(ApkType) })
  public type: string;

  @Column({ default: 0 })
  public rate1: number;
  @Column({ default: 0 })
  public rate2: number;
  @Column({ default: 0 })
  public rate3: number;
  @Column({ default: 0 })
  public rate4: number;
  @Column({ default: 0 })
  public rate5: number;
  @Column({ type: 'float4' })
  public avgRate: number;

  @Column({ default: 0 })
  public ratingsCount: number;

  @Column({ default: '0.0' })
  public ratingLabel: string;

  @Column({ type: 'bigint' })
  public reviewsCount: string;

  @Column({ type: 'bigint' })
  public viewsCount: string;

  @Column({ type: 'bigint' })
  public postsCount: string;

  @Column({ default: 0 })
  public shareCount: number;

  @Column({ type: 'bigint' })
  public downloadsCount: string | null;

  @Column({ default: null })
  public downloadsLabel: string;

  @Column({ default: false })
  public isPreRegistrant: boolean;

  @Column({ default: 0 })
  public registrantsCount: number;

  @Column({ nullable: true })
  public preRegistrantsUrl: string;

  @Column({ default: false })
  public isDownload: boolean;

  @Column({ default: '' })
  public permission: string;

  @Column()
  public releaseDate: Date;

  @Column()
  public currentVersion: string;

  @ManyToOne(() => Category, (c) => c.apks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Publisher, (p) => p.apks, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  publisher: Publisher;

  @OneToMany(() => ApkInfo, (i) => i.apk, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  infos: ApkInfo[];

  @OneToMany(() => ApkVersion, (p) => p.apk, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  versions: ApkVersion[];

  @OneToMany(() => ApkScreenshot, (p) => p.apk, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  screenshots: ApkScreenshot[];

  // @ManyToMany(() => Tag, (t) => t.apks)
  // @JoinTable({ name: 'apks_tags' })
  // tags: Tag[];

  get info(): ApkInfo | null {
    return this.infos.length ? this.infos[0] : null;
  }
}
