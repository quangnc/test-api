import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/modules/auth/entities/admin.entity';
import { UserStatus } from 'src/modules/auth/entities/user.entity';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class AdminsSeeder implements Seeder {
  constructor(@InjectRepository(Admin) private adminRepo: Repository<Admin>) {}
  async seed(): Promise<any> {
    // if ((await this.adminRepo.count()) > 0) {
    //   return;
    // }

    const admins = [];

    admins.push(<Admin>{
      id: 4,
      email: 'admin1@admin.com',
      avatar: '',
      lastName: 'admin1',
      firstName: 'admin1',
      password: hashPassword('admin'),
      role: 'admin',
      status: UserStatus.active,
    });

    await this.adminRepo.insert(admins);
  }

  async drop(): Promise<any> {
    return this.adminRepo.delete({});
  }
}
