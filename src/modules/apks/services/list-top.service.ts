import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApkListTop } from 'modules/apks/entities/apk-list-top.entity';

@Injectable()
export class ListTopService {
  constructor(
    @InjectRepository(ApkListTop) public apkListTopRepo: Repository<ApkListTop>,
  ) {}

  async listTop(
    keyword: string,
    offset: number,
    limit: number,
    orderBy: string,
    order: string,
    type: string,
    top: string,
    locale: string,
  ) {
    order = (order || 'ASC').toUpperCase();

    const queryBuilder = this.apkListTopRepo
      .createQueryBuilder()
      .where("ApkListTop.top = :top", { top })
      .andWhere("ApkListTop.type = :type", { type })
      .innerJoinAndSelect(
        'ApkListTop.apk',
        'Apks',
      )
      .innerJoinAndSelect(
        'Apks.infos',
        'Infos',
        `Infos.locale=:locale OR Infos.locale='en'`, { locale }
      )
      .innerJoinAndSelect('Apks.category', 'Category')
      .orderBy(`ApkListTop.${orderBy}`, order as any)
      .take(limit)
      .skip(offset);

    if(keyword){
      queryBuilder.andWhere('Infos.searchVector @@ plainto_tsquery(:query) OR Apks.searchVector @@ plainto_tsquery(:query)', { query: `${keyword}` })
    }
    
    return queryBuilder.getMany();
  }
}
