import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_type')
export class ServiceCategory extends TimeEntity {
  @Column()
  public name_vi: string;

  @Column()
  public name_en: string;

  @Column({ default: true })
  is_active: boolean;

  @OneToMany(() => Service, (a) => a.category)
  public services: Service[];
}
