import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';
import { Repository } from 'typeorm';
import { Tag } from 'modules/tags/entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) public tagRepo: Repository<Tag>,
    @InjectRepository(Apk) public apkRepo: Repository<Apk>,
  ) {}

  async getApksByTag(
    tag: string,
    sortBy: string | null = 'createdAt',
    order: string | null = 'DESC',
    type = 'app',
    offset: number,
    limit: number,
    locale = 'en',
  ) {
    const tagRecord = await this.tagRepo.findOneBy({ name: tag });
    if (tagRecord == null) {
      return null;
    }
    const apksQuery = await this.apkRepo
      .createQueryBuilder()
      .innerJoin('apks_tags', 'Tag', 'Apk.id=Tag.apksId AND Tag.tagsId=:tagId', {
        tagId: tagRecord.id,
      })
      .innerJoinAndSelect(
        'Apk.infos',
        'Infos',
        "(Infos.locale=:locale OR Infos.locale='en') AND Apk.id=Infos.apkId",
        {
          locale,
        },
      )
      .innerJoinAndSelect('Apk.category', 'Category')
      .innerJoinAndSelect(
        'Category.locales',
        'CatLocale',
        "CatLocale.locale=:locale OR CatLocale.locale='en'",
        { locale },
      )
      .innerJoinAndSelect('Apk.publisher', 'Publisher')
      .skip(offset)
      .take(limit);
    if (sortBy && order) {
      apksQuery.orderBy(`Apk.${sortBy}`, order.toUpperCase() as any);
    }
    if (type) {
      apksQuery.where('Apk.type=:type', { type });
    }
    return {
      tag: tagRecord,
      apks: await apksQuery.getMany(),
    };
  }
}
