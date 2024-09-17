import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';

@Entity('apk_stats')
export class ApkStat extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public apkId: number;

  @Column()
  public time: Date;

  @Column({ type: 'integer' })
  public downloads: number;

  @Column({ type: 'integer' })
  public views: number;

  @ManyToOne(() => Apk)
  @JoinColumn({ name: 'apkId' })
  public apk: Apk;
}
