import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';

@Entity('tags')
export class Tag extends AutoIdEntity {
  @Column()
  public name: string;

  // @ManyToMany(() => Apk, (apk) => apk.tags)
  // @JoinTable({ name: 'apks_tags' })
  // apks: Apk[];
}
