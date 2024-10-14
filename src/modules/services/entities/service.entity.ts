import { TimeEntity } from 'src/common/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ServiceCategory } from './service-type.entity';
import { ServiceLocales } from './service-locales.entity';

@Entity('services')
export class Service extends TimeEntity {
  @Column()
  serviceId: number;

  @Column()
  public url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column()
  public categoryId: number;

  @ManyToOne(() => ServiceCategory, (u) => u.services)
  @JoinColumn({ name: 'categoryId' })
  category: ServiceCategory;

  @OneToMany(() => ServiceLocales, (cl) => cl.service, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  locales: ServiceLocales[];

  get locale(): ServiceLocales | null {
    return this.locales && this.locales.length ? this.locales[0] : null;
  }
}
