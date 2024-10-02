import { AutoIdEntity } from 'src/common/base-entity';
import { Column, Entity } from 'typeorm';

@Entity('sliders')
export class Slider extends AutoIdEntity {
  @Column()
  url: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 1 })
  priority: number;

  @Column({ default: true })
  isActive: number;
}
