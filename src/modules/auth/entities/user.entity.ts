import { TimeEntity } from 'src/common/base-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { Article } from 'modules/articles/entities/article.entity';
import { hashPassword } from 'src/utils/bcrypt';

export enum UserStatus {
  active = 'active',
  terminate = 'terminate',
}

@Entity('users')
export class User extends TimeEntity {
  @Column({ unique: true, nullable: true })
  public email: string;

  @Column({ nullable: true })
  public password: string;

  @Column({ unique: false })
  public username: string;

  @Column({ default: '' })
  public device: string;

  @Column({ nullable: false })
  public firstName: string;

  @Column({ nullable: false })
  public lastName: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ nullable: true })
  public socialId: string;

  @Column({ default: 'en' })
  public locale: string;

  @Column({ enum: [UserStatus.active, UserStatus.terminate] })
  public status: string;

  @OneToMany(() => Article, (a) => a.author)
  public articles: Article[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashPassword(this.password);
    }
  }
}
