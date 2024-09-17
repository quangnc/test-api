import { ApkVersion } from 'modules/apks/entities/apk-version.entity';
import { ApkVariantMapper } from 'src/mappers/apk-variant.mapper';
import { ApkMapper } from './apk.mapper';

export class ApkVersionMapper {
  static mapOne(version: ApkVersion): Record<string, any> {
    return {
      id: version.id,
      releasedAt: version.releasedAt,
      versionName: version.versionName,
      versionCode: version.versionCode,
      variantsCount: version.variantsCount,
      // description: version.devNote ?? null,
      requirements: version.variants ? version.variants[0]?.requirements : null,
      sdkPlatform: version.variants ? version.variants[0]?.sdkPlatform : null,
      // fs: version?.fs ? ApkMapper.mapRawApkFs(version?.fs) : [],
    };
  }

  static mapDetail(version: ApkVersion) {
    return {
      ...this.mapOne(version),
      variants: version.variants ? ApkVariantMapper.mapList(version.variants) : undefined,
      // description: version.devNote,
      // updatedAt: version.updatedAt,
      // createdAt: version.createdAt,
    };
  }

  static mapList(versions: ApkVersion[]): Record<string, any> {
    return versions.map((version) => this.mapOne(version));
  }
}
