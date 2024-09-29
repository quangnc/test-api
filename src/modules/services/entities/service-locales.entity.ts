import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Service } from './service.entity';
import { AutoIdEntity } from 'src/common/base-entity';

@Entity('service_locales')
export class ServiceLocales extends AutoIdEntity {
  @Column()
  public serviceId: number;

  @Column({ enum: ['en', 'vi'] })
  locale: string;

  @Column()
  public name: string;

  @Column('text')
  public description: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public keyword: string;

  @Column({ nullable: true })
  public keyword_title: string;

  @Column({ nullable: true })
  public keyword_description: string;

  @ManyToOne(() => Service, (c) => c.locales)
  @JoinColumn({ name: 'serviceId' })
  service: Service;
}
