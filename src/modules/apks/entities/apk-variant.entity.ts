import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, Index } from 'typeorm';
import { ApkVersion } from './apk-version.entity';

@Entity('apk_variants')
@Index(['apkVersionId', 'fileType'], { unique: true })
export class ApkVariant extends AutoIdEntity {

  @Column()
  public apkVersionId: number;

  @Column()
  public requirements: string;

  @Column()
  public sdkPlatform: string;

  @Column()
  public architecture: string;

  @Column()
  public signature: string;

  @Column()
  public screenDpi: string;

  @Column()
  public fileSize: string;

  @Column()
  public fileSha1: string;

  @Column()
  public fileType: string;

  @Column({ nullable: true })
  public fileId: string;

  @ManyToOne(() => ApkVersion, (v) => v.variants)
  @JoinColumn({ name: 'apkVersionId' })
  public version: ApkVersion;
}
