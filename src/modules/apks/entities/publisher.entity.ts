import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';

@Entity('publishers')
export class Publisher extends AutoIdEntity {
  @Column()
  public name: string;

  @Column()
  @Index()
  public devId: string;

  @Column({ nullable: true })
  public description: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ nullable: true })
  public email: string;

  @Column({ nullable: true })
  public address: string;

  @Column({ nullable: true })
  public website: string;

  @OneToMany(() => Apk, (a) => a.publisher)
  apks: Apk[];
}
