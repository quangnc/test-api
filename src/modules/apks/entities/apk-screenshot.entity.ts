import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Apk } from './apk.entity';
import { AutoIdEntity } from 'src/common/base-entity';
import { ImageType } from '../enums';

export enum ApkMediaType {
  video = 'video',
  image = 'image',
}

@Entity('apk_screenshots')
export class ApkScreenshot extends AutoIdEntity {
  @Column()
  public apkId: number;

  @Column()
  public url: string;

  @Column({ nullable: true })
  public width: number;

  @Column({ nullable: true })
  public height: number;

  @Column()
  public fifeUrlOptions: boolean;

  @Column({ enum: ImageType })
  public imageType: number;

  @Column({ default: 1 })
  public priority: number;

  @Column({ type: 'varchar', enum: ApkMediaType })
  public mediaType: ApkMediaType;

  @Column()
  public locale: string;

  @ManyToOne(() => Apk, (a) => a.screenshots)
  @JoinColumn({ name: 'apkId' })
  public apk: Apk;
}
