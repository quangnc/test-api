import { ApkListTop } from 'modules/apks/entities/apk-list-top.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { CategoryMapper } from './category.mapper'

export class ListTopMapper{
  static mapOne(apkListTop: ApkListTop): Record<string, any>{
    return {
      name: apkListTop.apk.infos[0]?.name || null,
      packageId: apkListTop.apk.packageName,
      slug: apkListTop.apk?.slug || null,
      featureImage: apkListTop.apk.infos[0]?.featureImage || null,
      icon: apkListTop.apk?.icon || null,
      description: apkListTop.apk.infos[0]?.description || null,
      avgRate: apkListTop.apk.avgRate,
      fileSize: apkListTop.apk.fileSize,
      category: CategoryMapper.mapOne(apkListTop.apk.category)
    }
  }

  static mapList(apkListTop: ApkListTop[]): Record<string, any> {
    return apkListTop.map((a) => this.mapOne(a));
  }
}
