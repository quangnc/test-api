import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';
import { enumValues } from 'src/utils/array';

export enum ApkListType {
  editorChoice = 'editor-choice',
  discover = 'discover',
}

@Entity('apk_lists')
export class ApkList extends TimeEntity {
  @Column({ enum: enumValues(ApkListType) })
  public name: string;

  @Column({ default: 0 })
  public priority: number;

  @Column()
  public apkId: number;

  @OneToOne(() => Apk)
  @JoinColumn()
  apk: Apk;
}
