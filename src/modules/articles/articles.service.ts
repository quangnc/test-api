import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from 'modules/articles/entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) public articleRepo: Repository<Article>,
  ) {}

  async getList(
    list: string[],
    type: string,
    offset: number,
    limit: number,
    locale = 'en',
  ) {
    const isGetNewest = list.includes('newest');
    const isGetPopular = list.includes('populars');
    const results = {
      populars: null,
      newest: null,
    };
    if (isGetNewest) {
      results.newest = await this.articleRepo.find({
        where: { locale, type },
        order: { createdAt: 'DESC' },
        skip: offset,
        take: limit,
      });
    }
    if (isGetPopular) {
      results.populars = await this.articleRepo.find({
        where: { locale, type },
        order: { views: 'DESC' },
        skip: offset,
        take: limit,
      });
    }

    return results;
  }

  async getListByType(
    type: string,
    offset: number,
    limit: number,
    locale = 'en',
  ) {
    return this.articleRepo.find({
      where: { locale, type },
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  async getByIdSlug(idOrSlug: any) {
    const id = parseInt(idOrSlug);
    let where = {};
    if (!isNaN(id)) {
      where = { id };
    } else {
      where = { slug: idOrSlug };
    }
    const discovr = await this.articleRepo.findOne({
      where,
      relations: ['author'],
    });
    return discovr;
  }

  async getDetail(idOrSlug: any, offset: number, limit: number, locale = 'en') {
    const article = await this.getByIdSlug(idOrSlug);

    return { article };
  }
}
