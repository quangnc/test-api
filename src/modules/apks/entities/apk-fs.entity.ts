import { Entity, Column, Index, JoinColumn, ManyToOne } from 'typeorm';

import { enumValues } from 'src/utils/array';
import { AutoIdEntity } from 'src/common/base-entity';
import { ApkVersion } from './apk-version.entity';

export enum TypeApkFs {
  APK = 'apk',
  XAPK = 'xapk',
}

export type ResApkFs = {
  fileId: number;
  cookie: string;
  port: number;
  volumeId: string;
  apkId: number;
  type: string;
  versionId: number;
};

@Entity('apk-fs')
@Index("FK_apk_fs", { synchronize: false })
export class ApkFs extends AutoIdEntity {
  @Column({ nullable: true })
  cookie: string;

  @Column({ nullable: true })
  fileId: number;

  @Column({ nullable: true })
  port: number;

  @Column({ nullable: true })
  volumeId: string;

  @Column()
  public apkId: number;

  @Column({ enum: enumValues(TypeApkFs) })
  type: string;

  @Column()
  public versionId: number;

  @ManyToOne(() => ApkVersion, (a) => a.fs)
  @JoinColumn()
  version: ApkVersion;
}
