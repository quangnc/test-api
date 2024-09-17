import {AutoIdEntity} from 'src/common/base-entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('category_locales')
@Index(['categoryId', 'locale'], { unique: true })
export class CategoryLocale extends AutoIdEntity {
  @Column()
  public categoryId: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public locale: string;

  @ManyToOne(() => Category, (c) => c.locales)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
