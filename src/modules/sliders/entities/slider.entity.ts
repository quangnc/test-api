import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';

@Entity('sliders')
export class Slider extends AutoIdEntity {
  @Column()
  url: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  apkId: number;

  @Column({ nullable: true })
  image: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 1 })
  priority: number;

  @OneToOne(() => Apk)
  @JoinColumn()
  apk: Apk;
}
