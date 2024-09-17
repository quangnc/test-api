import { Apk, ApkType } from 'modules/apks/entities/apk.entity';
import { enumValues } from 'src/utils/array';
import { ApkTopList } from 'modules/apks/enums';
import { Publisher } from './entities/publisher.entity';
import { ApkInfo } from './entities/apk-info.entity';
import { ApkVersion } from './entities/apk-version.entity';
import { ApkScreenshot } from './entities/apk-screenshot.entity';
import { ApkVariant } from './entities/apk-variant.entity';
import { Category } from '../categories/entities/category.entity';
import { ApkList } from './entities/apk-list.entity';
import { ApkStat } from './entities/apk-stat.entify';
import { Keyword } from './entities/keyword.entity';
// import { ApkRatingStore } from './entities/apk-rating-store.entity';
import { ApkFs } from './entities/apk-fs.entity';
import { ApkListTop } from './entities/apk-list-top.entity';
import { ApkVersionInfo } from './entities/apk-version-dev.entity';

export const listApkTypes = [ApkType.app, ApkType.game];

export const listTopApks = enumValues(ApkTopList);

export const ApksFeature = [
  Apk,
  ApkFs,
  ApkInfo,
  ApkList,
  ApkStat,
  Keyword,
  Category,
  Publisher,
  ApkVersion,
  ApkVersionInfo,
  ApkVariant,
  ApkScreenshot,
  // ApkRatingStore,
  ApkListTop,
];
