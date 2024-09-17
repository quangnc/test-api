import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Apk, ApkType } from 'modules/apks/entities/apk.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { enumValues } from 'src/utils/array';

export enum ApkListType {
  appsTopsellingFree = 'apps_topselling_free',
  appsTopsellingPaid = 'apps_topselling_paid',
  appsTopgrossing = 'apps_topgrossing',
  appsMoversShakers = 'apps_movers_shakers',
}

@Entity('apk_lists_top')
export class ApkListTop extends TimeEntity {
  @Column()
  public categoryId: number;

  @Column({ enum: enumValues(ApkListType) })
  public top: string;

  @Column({ default: 0 })
  public priority: number;

  @Column()
  public apkId: number;

  @Column({ default: '' })
  versionString: string;

  @Column({ default: '' })
  versionCode: string;

  @Column({ default: '' })
  icon: string;

  @Column({ default: '' })
  thumb: string;

  @Column({ enum: enumValues(ApkType) })
  type: string;

  @Column({ default: false })
  status: boolean;

  @ManyToOne(() => Apk)
  @JoinColumn()
  apk: Apk;
}
