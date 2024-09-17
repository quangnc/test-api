import { Column, Entity, ManyToOne, OneToMany, Index } from 'typeorm';

import { Apk } from './apk.entity';
import { ApkVersionInfo } from './apk-version-dev.entity';
import { ApkVariant } from './apk-variant.entity';
import { AutoIdEntity } from 'src/common/base-entity';
import { ApkFs, ResApkFs } from './apk-fs.entity';

@Entity('apk_versions')
@Index("FK_apk_versions", { synchronize: false })
@Index(['apkId', 'versionCode'], { unique: true })
export class ApkVersion extends AutoIdEntity {
  @Column()
  public apkId: number;

  @Column()
  public versionName: string;

  @Column({ default: 0 })
  public versionCode: number;

  @Column()
  public fileTypes: string;

  @Column({ default: 0 })
  public variantsCount: number;

  @Column()
  public releasedAt: Date;

  @ManyToOne(() => Apk, (a) => a.versions)
  apk: Apk;

  @OneToMany(() => ApkVariant, (v) => v.version, { cascade: true, onDelete: 'CASCADE' })
  variants: ApkVariant[];

  @OneToMany(() => ApkVersionInfo, (v) => v.version, { cascade: true, onDelete: 'CASCADE' })
  devNotes: ApkVersionInfo[];

  @OneToMany(() => ApkFs, (c) => c.version, {onDelete: 'CASCADE'})
  fs: ResApkFs[];
}
