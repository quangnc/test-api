import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) public userRepo: Repository<User>) {}

  async findById(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  }
}
