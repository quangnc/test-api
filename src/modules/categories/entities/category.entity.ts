import { Column, Entity, OneToMany, BaseEntity, PrimaryColumn} from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';
import { CategoryLocale } from './category-locale.entity';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column({unique: true})
  public key: string;

  @Column({ enum: ['app', 'game'] })
  public type: string;

  @OneToMany(() => Apk, (apk) => apk.category, { onDelete: 'SET NULL' })
  apks: Apk[];

  @OneToMany(() => CategoryLocale, (cl) => cl.category, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  locales: CategoryLocale[];

  get locale(): CategoryLocale | null {
    return this.locales && this.locales.length ? this.locales[0] : null;
  }
  
}
