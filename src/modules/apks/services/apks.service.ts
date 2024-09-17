import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Apk } from 'modules/apks/entities/apk.entity';
import { ApkTopList } from 'modules/apks/enums';
import { ApkVersion } from 'modules/apks/entities/apk-version.entity';
import { ApkScreenshot } from 'modules/apks/entities/apk-screenshot.entity';
import { ApkVariant } from 'modules/apks/entities/apk-variant.entity';
import { Category } from 'modules/categories/entities/category.entity';
import { ApkList } from 'modules/apks/entities/apk-list.entity';
import { Publisher } from 'modules/apks/entities/publisher.entity';
import { StatsService } from 'modules/apks/services/stats.service';
import { ApkStat } from 'modules/apks/entities/apk-stat.entify';
import { dateToSqlTimestamp } from 'src/utils/app';
import { ApkFs } from '../entities/apk-fs.entity';
import { CategoryLocale } from 'src/modules/categories/entities/category-locale.entity';

@Injectable()
export class ApksService {
  constructor(
    @InjectRepository(Apk) public apkRepo: Repository<Apk>,
    @InjectRepository(ApkFs) public apkFsRepo: Repository<ApkFs>,
    @InjectRepository(ApkList) public apkListRepo: Repository<ApkList>,
    @InjectRepository(ApkVersion) public apkVersionRepo: Repository<ApkVersion>,
    @InjectRepository(Category) public categoryRepo: Repository<Category>,
    @InjectRepository(ApkVariant) public apkVariantRepo: Repository<ApkVariant>,
    @InjectRepository(Publisher) public publisherRepo: Repository<Publisher>,
    @InjectRepository(ApkScreenshot)
    public apkScreenshotRepo: Repository<ApkScreenshot>,
    @InjectRepository(ApkStat) public apkStatRepo: Repository<ApkStat>,
    private statService: StatsService,
  ) {}

  async list(
    offset: number,
    limit: number,
    type: string,
    orderBy: string,
    order: string,
    categoryId: number,
    locale = 'en',
  ) {
    order = (order || 'ASC').toUpperCase();

    const queryBuilder = this.apkRepo
      .createQueryBuilder()
      .where(categoryId ? { categoryId } : {})
      .innerJoinAndSelect(
        'Apk.infos',
        'Infos',
        "(Infos.locale=:locale OR Infos.locale='en') AND Apk.id=Infos.apkId",
        {
          locale,
        },
      )
      .innerJoinAndSelect('Apk.category', 'Category')
      .leftJoinAndSelect('Apk.publisher', 'Publisher')
      .innerJoinAndSelect(
        'Category.locales',
        'CatLocale',
        "CatLocale.locale=:locale OR CatLocale.locale='en'",
        { locale },
      )
      .orderBy(`Apk.${orderBy}`, order as any)
      // .select(this.selectListFields)
      .take(limit)
      .skip(offset);

    return queryBuilder.getMany();
  }

  getApkList(offset: number, limit: number, name: string, locale = 'en') {
    const apks = this.apkListRepo
      .createQueryBuilder()
      .where({ name })
      .innerJoinAndSelect('ApkList.apk', 'Apk')
      .innerJoinAndSelect('Apk.versions', 'Versions')
      .leftJoinAndSelect('Versions.fs', 'ApkFs')
      .innerJoinAndSelect('Apk.category', 'Category')
      .leftJoinAndSelect('Apk.publisher', 'Publisher')
      .innerJoinAndSelect(
        'Category.locales',
        'CatLocale',
        "CatLocale.locale=:locale OR CatLocale.locale='en'",
        { locale },
      )
      .innerJoinAndSelect(
        'Apk.infos',
        'ApkInfo',
        "ApkList.apkId=Apk.id AND (ApkInfo.locale=:locale OR ApkInfo.locale='en')",
        { locale },
      )
      .orderBy(`ApkList.priority`, 'DESC')
      .skip(offset)
      .limit(limit)
      .getMany();

    return apks;
  }

  async listTop(
    offset: number,
    limit: number,
    list: string,
    categoryId: number,
    type: string,
    locale = 'en',
  ) {
    const queryBuilder = this.apkRepo
      .createQueryBuilder('Apk')
      .innerJoinAndSelect(
        'Apk.infos',
        'info',
        'Apk.id=info.apkId and info.locale=:lang',
        { lang: 'en' },
      )
      .innerJoinAndSelect(
        CategoryLocale,
        'category',
        'category.categoryId=Apk.categoryId and category.locale=:locale',
        { locale: 'en' },
      )
      .select('Apk.slug', 'slug')
      .addSelect('Apk.icon', 'icon')
      .addSelect('Apk.type', 'type')
      .addSelect('Apk.packageName', 'packageName')
      .addSelect('Apk.avgRate', 'avgRate')
      .addSelect('Apk.categoryId', 'categoryId')
      .addSelect('info.name', 'name')
      .addSelect('category.name', 'category')
      .where({ type })
      .addOrderBy('Apk.viewsCount', 'DESC')
      .offset(offset)
      .limit(limit);

    if (categoryId) {
      queryBuilder.andWhere({ categoryId });
    }

    switch (list) {
      case ApkTopList.trending:
      case ApkTopList.hot:
        queryBuilder.addOrderBy('Apk.viewsCount', 'DESC');
        queryBuilder.addOrderBy('Apk.downloadsCount', 'DESC');
        break;
      case ApkTopList.topFree:
        queryBuilder.addOrderBy('Apk.createdAt', 'DESC');
        queryBuilder.addOrderBy('Apk.downloadsCount', 'DESC');
        queryBuilder.andWhere({ price: 0 });
        break;
      case ApkTopList.lastUpdate:
        queryBuilder.addOrderBy('Apk.updatedAt', 'DESC');
        break;
      case ApkTopList.newest:
        queryBuilder.orderBy('Apk.releaseDate', 'DESC');
        break;
      case ApkTopList.onSale:
        queryBuilder.andWhere({
          saleUntil: MoreThan(new Date()),
          salePrice: MoreThan(0),
        });
        queryBuilder.addOrderBy('Apk.updatedAt', 'DESC');
        break;
      case ApkTopList.preRegister:
        queryBuilder.andWhere({ isPreRegistrant: true });
        queryBuilder.addOrderBy('Apk.createdAt', 'DESC');
        break;
      case ApkTopList.downloads:
        queryBuilder.addOrderBy('Apk.downloadsCount', 'DESC');
        break;
      case ApkTopList.reviews:
        queryBuilder.addOrderBy('Apk.reviewsCount', 'DESC');
        break;
      case ApkTopList.ratings:
        queryBuilder.addOrderBy('Apk.avgRate', 'DESC');
        break;
      case ApkTopList.popular24h:
        const d = new Date();
        d.setHours(-24);
        d.setMinutes(0);
        d.setMilliseconds(0);
        d.setSeconds(0);

        queryBuilder.innerJoinAndSelect(
          (qb) =>
            qb
              .select([
                'ApkStat.apkId',
                'sum(ApkStat.views)::integer as "views"',
                'sum(ApkStat.downloads)::integer as "downloads"',
              ])
              .from(ApkStat, 'ApkStat')
              .where('"ApkStat"."time">:time', {
                time: `'${dateToSqlTimestamp(d)}'`,
              })
              .groupBy('ApkStat.apkId'),
          'ApkStat',
          'Apk.id="ApkStat_apkId"',
        );

        queryBuilder.addOrderBy('downloads', 'DESC');
        queryBuilder.addOrderBy('views', 'DESC');
        break;

      default:
        break;
    }
    queryBuilder.cache(true);
    return queryBuilder.getRawMany();
  }

  async getDetail(packageName: string, locale = 'en') {
    const apk = await this.apkRepo.findOneOrFail({
      where: {
        packageName: packageName,
        infos: [{ locale }, { locale: 'en' }],
        screenshots: [{ locale }, { locale: 'en' }],
      },
      relations: ['infos', 'screenshots', 'tags'],
    });
    apk.versions = await this.apkVersionRepo.find({
      where: { apkId: apk.id },
      take: 6,
      order: { releasedAt: 'DESC' },
      select: {
        id: true,
        variantsCount: true,
        versionName: true,
        versionCode: true,
        releasedAt: true,
        // devNote: true,
      },
      relations: ['variants', 'fs'],
    });

    apk.screenshots = await this.apkScreenshotRepo.find({
      where: { apkId: apk.id },
      order: { priority: 'ASC' },
    });
    apk.category = await this.categoryRepo
      .createQueryBuilder()
      .where('Category.id = :catId', { catId: apk.categoryId })
      .innerJoinAndSelect(
        'Category.locales',
        'CatLocale',
        'CatLocale.locale=:locale',
        { locale },
      )
      .getOne();

    await this.statService.incStat(apk.id, new Date(), 'views');

    return {
      apk,
    };
  }

  // async getApkFs(packageName: string, versionCode: string) {
  //   const apk = await this.apkRepo.findOne({
  //     where: {
  //       packageName,
  //       versions: { versionCode },
  //     },
  //     relations: ['versions'],
  //   });

  //   if (!apk) {
  //     return null;
  //   }

  //   const fs = await this.apkFsRepo.find({
  //     where: { apkId: apk.id, versionId: apk?.versions[0].id },
  //   });

  //   return fs;
  // }

  async findSimilar(
    packageName: string,
    offset: number,
    limit: number,
    locale: string,
  ) {
    const apk = await this.apkRepo.findOneByOrFail({ packageName });

    const queryBuilder = this.apkRepo
      .createQueryBuilder()
      .where({
        categoryId: apk.categoryId,
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
      .leftJoinAndSelect(
        'Apk.publisher',
        'Publisher',
        'Apk.publisherId=Publisher.id',
      )
      .innerJoinAndSelect(
        'Category.locales',
        'CatLocale',
        "CatLocale.locale=:locale OR CatLocale.locale='en'",
        { locale },
      )
      .orderBy(`Apk.downloadsCount`, 'DESC')
      .take(limit)
      .skip(offset);

    return queryBuilder.getMany();
  }

  async findByPublisherId(
    id: number,
    offset: number,
    limit: number,
    locale: string,
  ) {
    const publisher = await this.publisherRepo.findOneByOrFail({ id });
    const queryBuilder = this.apkRepo
      .createQueryBuilder()
      .where({
        publisherId: publisher.id,
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
      .orderBy(`Apk.updatedAt`, 'DESC')
      .take(limit)
      .skip(offset);

    return {
      publisher,
      apks: await queryBuilder.getMany(),
    };
  }

  async getApkVersions(
    apkId: number,
    offset: number,
    limit: number,
    locale = 'en',
  ) {
    const apk = await this.apkRepo.findOneOrFail({
      where: { id: apkId, infos: [{ locale }, { locale: 'en' }] },
      relations: ['infos'],
    });
    apk.versions = await this.apkVersionRepo.find({
      where: { apkId },
      order: { releasedAt: 'DESC' },
      skip: offset,
      take: limit,
    });
    return apk;
  }

  async getApkVersionDetail(apkId: number, vId: number, locale: string) {
    const apk = await this.apkRepo.findOneOrFail({
      where: { id: apkId, infos: [{ locale }, { locale: 'en' }] },
      relations: ['infos'],
    });
    const version = await this.apkVersionRepo.findOneByOrFail({ id: vId });
    const variants = await this.apkVariantRepo.findBy({ apkVersionId: vId });
    return {
      apk,
      version,
      variants,
    };
  }
}
