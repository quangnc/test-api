import { AutoIdEntity } from 'src/common/base-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Apk } from './apk.entity';
import { removeDiacritics } from 'src/utils/string';

@Entity('apk_infos')
@Index(['apkId', 'locale'], { unique: true })
export class ApkInfo extends AutoIdEntity {
  @Column()
  public apkId: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public content: string;

  @Column()
  public locale: string;

  @Column()
  public featureImage: string;

  @Column({ nullable: true })
  public privacyPolicyUrl: string;

  @Column({ type: 'tsvector', nullable: true })
  @Index({ fulltext: true })
  public searchVector: string;

  @ManyToOne(() => Apk, (a) => a.info)
  @JoinColumn({ name: 'apkId' })
  public apk: Apk;

  @BeforeInsert()
  @BeforeUpdate()
  beforeUpsert() {
    if (this.name) {
      ApkInfo.query('UPDATE apk_infos SET "searchVector" = to_tsvector($1) WHERE id = $2', [
        `'${removeDiacritics(this.name)}'`,
        this.id,
      ]).then(() => null);
    }
  }
}
