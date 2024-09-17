import {
  BaseEntity as Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class AutoIdEntity extends Entity {
  @PrimaryGeneratedColumn()
  id: number;
}

export class TimeEntity extends Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
