import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) public catRepo: Repository<Category>) {}

  findAllByType(type: string, locale = 'en') {
    return this.catRepo.find({
      where: { type, locales: [{ locale }, { locale: 'en' }] },
      relations: ['locales'],
    });
  }
}
