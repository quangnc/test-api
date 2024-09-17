import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from 'src/modules/auth/entities/user.entity';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async seed(): Promise<any> {
    if ((await this.userRepo.count()) > 0) {
      return;
    }

    const users = [];

    users.push(<User>{
      email: 'niemtt.dev@gmail.com',
      avatar: null,
      username: 'robertzhao',
      device: 'Google Nexus',
      firstName: 'Robert',
      lastName: 'Zhao',
      password: hashPassword('12345'),
      locale: 'en',
      status: UserStatus.active,
    });

    await this.userRepo.insert(users);
  }

  async drop(): Promise<any> {
    return this.userRepo.delete({});
  }
}
