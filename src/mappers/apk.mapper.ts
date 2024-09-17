import { Apk } from 'modules/apks/entities/apk.entity';
import { PublisherMapper } from 'src/mappers/publisher.mapper';
import { ApkVersionMapper } from 'src/mappers/apk-version.mapper';
import { ApkScreenshotMapper } from 'src/mappers/apk-screenshot.mapper';
import { CategoryMapper } from 'src/mappers/category.mapper';
import { ResApkFs } from 'src/modules/apks/entities/apk-fs.entity';

export class ApkMapper {
  static mapOne(apk: Apk): Record<string, any> {
    return {
      id: apk.id,
      icon: apk.icon,
      salePrice: apk.salePrice,
      price: apk.price,
      saleUntil: apk.saleUntil,
      slug: apk.slug,
      avgRate: apk.avgRate,
      isPreRegistrant: apk.isPreRegistrant,
      preRegistrantsUrl: apk.preRegistrantsUrl,
      registrantsCount: apk.registrantsCount,
      reviewsCount: apk.reviewsCount || 0,
      postsCount: apk.postsCount || 0,
      shareCount: apk.shareCount || 0,
      releaseDate: apk.releaseDate,
      type: apk.type,
      packageId: apk.packageName,
      featureImage: apk.info?.featureImage,
      name: apk.info?.name,
      description: apk.info?.description
        ?.substring(0, 160)
        .replace(/<\/?[^>]+(>|$)/g, ''),
      content: apk.info?.content ?? null,
      screenshots: apk.screenshots
        ? ApkScreenshotMapper.mapList(apk.screenshots)
        : null,
      publisher: apk.publisher ? PublisherMapper.mapOne(apk.publisher) : null,
      category: apk.category ? CategoryMapper.mapOne(apk.category) : null,
      createdAt: apk.createdAt,
      versions: ApkVersionMapper.mapList(apk?.versions ?? []),
      permissions: apk.permission ?? '',
    };
  }

  static mapDetail(apk: Apk) {
    return {
      ...this.mapOne(apk),
      createdAt: apk.createdAt,
      versions: ApkVersionMapper.mapList(apk?.versions ?? []),
    };
  }

  static mapList(apks: Apk[]): Record<string, any> {
    return apks.map((a) => this.mapOne(a));
  }

  static mapOneFromRaw(raw: Record<string, any>) {
    const result = {};
    for (const key of Object.keys(raw)) {
      if (key.includes('Apk_')) {
        result[key.replace('Apk_', '')] = raw[key];
        continue;
      }

      if (key.includes('Info_')) {
        if (!result['info']) {
          result['info'] = {};
        }
        result['info'][key.replace('Info_', '')] = raw[key];
        continue;
      }

      if (key.includes('Publisher_')) {
        if (!result['publisher']) {
          result['publisher'] = {};
        }
        result['publisher'][key.replace('Publisher_', '')] = raw[key];
        continue;
      }

      if (key.includes('Category_')) {
        if (!result['category']) {
          result['category'] = {};
        }
        result['category'][key.replace('Category_', '')] = raw[key];
        continue;
      }

      result[key] = raw[key];
    }
    return ApkMapper.mapOne(result as Apk);
  }

  static mapRawList(rawList: Record<string, any>[]) {
    return rawList.map(this.mapOneFromRaw);
  }

  static mapRawApkFs(raw: ResApkFs[]) {
    return raw.map((item) => ({
      cookie: item.cookie,
      fileId: item.fileId,
      port: item.port,
      volumeId: item.volumeId,
      type: item.type,
    }));
  }
}
