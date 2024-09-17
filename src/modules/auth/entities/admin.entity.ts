import { AutoIdEntity } from 'src/common/base-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { hashPassword } from 'src/utils/bcrypt';
import { UserStatus } from 'modules/auth/entities/user.entity';
import { enumValues } from 'src/utils/array';

export enum AdminRole {
  admin = 'admin',
  editor = 'editor',
}

@Entity('admins')
export class Admin extends AutoIdEntity {
  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ nullable: false })
  public firstName: string;

  @Column({ nullable: false })
  public lastName: string;

  @Column({ nullable: true })
  public avatar: string;

  @Column({ enum: enumValues(AdminRole) })
  public role: string;

  @Column({ enum: [UserStatus.active, UserStatus.terminate] })
  public status: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashPassword(this.password);
    }
  }
}
