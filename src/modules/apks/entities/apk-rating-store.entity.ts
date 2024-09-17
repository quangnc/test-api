import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';

import { Apk } from './apk.entity';
import { AutoIdEntity } from 'src/common/base-entity';

@Entity('apk-rating-store')
export class ApkRatingStore extends AutoIdEntity {
  @Column({ default: 0 })
  oneStar: number;

  @Column({ default: 0 })
  twoStar: number;

  @Column({ default: 0 })
  threeStar: number;

  @Column({ default: 0 })
  fourStar: number;

  @Column({ default: 0 })
  fiveStar: number;

  @Column({ default: 0.0, type: 'float' })
  starRating: number;

  @Column({ default: 0 })
  ratingsCount: number;

  @Column({ default: '0.0' })
  ratingLabel: string;

  // @OneToOne(() => Apk, (a) => a.apkRatingStore)
  // @JoinColumn()
  // apk: Apk;
}
