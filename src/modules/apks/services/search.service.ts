import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';
import { ApkScreenshot } from 'modules/apks/entities/apk-screenshot.entity';
import { ApkInfo } from 'modules/apks/entities/apk-info.entity';
import { Keyword } from 'modules/apks/entities/keyword.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Apk) public apkRepo: Repository<Apk>,
    @InjectRepository(Keyword) public keywordRepo: Repository<Keyword>,
    @InjectRepository(ApkInfo) public apkInfoRepo: Repository<ApkInfo>,
    @InjectRepository(ApkScreenshot) public apkScreenshot: Repository<ApkScreenshot>,
  ) {}

  async search(
    keyword: string,
    offset: number,
    limit: number,
    isLoadScreenshot: boolean,
    locale: string,
  ) {
    const apksQuery = await this.apkRepo
      .createQueryBuilder()
      .innerJoinAndSelect(
        'Apk.infos',
        'Info',
        `Info.apkId=Apk.id AND (Info.locale=:locale OR Info.locale='en')`,
        {
          locale,
        },
      )
      .innerJoinAndSelect('Apk.publisher', 'Publisher')
      .innerJoinAndSelect('Apk.versions', 'Versions')
      .leftJoinAndSelect('Versions.fs', 'ApkFs')
      .skip(+offset || 0)
      .take(+limit | 10);

    if (keyword) {
      apksQuery.andWhere(
        `Info.name LIKE :keyword OR Info.searchVector @@ plainto_tsquery(:query) OR Apk.searchVector @@ plainto_tsquery(:query)`,
        {
          keyword: `${keyword}%`,
          query: `${keyword}`,
        },
      );
    }

    apksQuery.addOrderBy('Apk.downloadsCount', 'DESC');

    const apks = await apksQuery.getMany();

    if (isLoadScreenshot && apks.length > 0) {
      const apkId = apks[0].id;
      apks[0].screenshots = await this.apkScreenshot.findBy([
        { locale, apkId },
        { locale: 'en', apkId },
      ]);
    }

    let rest = await this.keywordRepo.findOneBy({ keyword: keyword.trim() });
    if (!rest) {
      rest = Keyword.create({
        searchCount: 0,
        resultCount: 0,
        keyword: keyword.trim(),
      });
    }
    rest.resultCount = apks.length;
    rest.searchCount = rest.searchCount + 1;

    await rest.save();

    return apks;
  }

  async getRecent() {
    return this.keywordRepo.find({
      take: 10,
      where: { resultCount: MoreThan(0) },
      order: { createdAt: 'DESC' },
    });
  }

  async getTrending() {
    return this.keywordRepo.find({
      take: 10,
      where: { resultCount: MoreThan(0) },
      order: { searchCount: 'DESC' },
    });
  }
}
