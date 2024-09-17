import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApksService } from '../services/apks.service';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { ListApksQuery } from 'modules/apks/requests/queries';
import { ApkTopList } from 'modules/apks/enums';
import { enumValues } from 'src/utils/array';
import { ApiResponse } from 'src/common/api.response';
import { IsPublic } from 'src/common/decorators';
import { ApkMapper } from 'src/mappers/apk.mapper';
import { PaginationQuery } from 'src/common/requests/queries';
import { ApkVersionMapper } from 'src/mappers/apk-version.mapper';
import { ApkVariantMapper } from 'src/mappers/apk-variant.mapper';
import { ResApkFs } from '../entities/apk-fs.entity';

type ApkFsResponse = {
  apk: Omit<ResApkFs, 'versionId' | 'apkId'>[];
};

@Controller({
  path: 'apks',
  version: '1',
})
@IsPublic()
export class ApksController {
  constructor(private readonly apksService: ApksService) {}

  @Get()
  async list(@UserLanguage() language: string, @Query() query: ListApksQuery) {
    const list = await this.apksService.list(
      +query.offset || 0,
      +query.limit || 10,
      query.type,
      query.sortBy || 'createdAt',
      query.order,
      +query.categoryId,
      language,
    );

    return ApiResponse.success({
      apks: ApkMapper.mapList(list),
    });
  }

  @Get('/list/:list')
  async listTop(
    @UserLanguage() language: string,
    @Param('list') list,
    @Query() query: ListApksQuery,
  ) {
    const supportList = enumValues(ApkTopList);
    if (!supportList.includes(list)) {
      return ApiResponse.badRequest({
        message: 'Support one of list: ' + supportList.join(','),
        error: 'invalidLists',
      });
    }

    const result = await this.apksService.listTop(
      +query.offset || 0,
      +query.limit || 10,
      list,
      +query.categoryId || null,
      query.type,
      language,
    );

    return ApiResponse.success({
      apks: ApkMapper.mapRawList(result),
    });
  }

  // @Get('fs/:id/:versionCode')
  // async getApkFs(@Param() { id, versionCode }): Promise<ApkFsResponse> {
  //   const res = await this.apksService.getApkFs(id, versionCode);

  //   if (!res) {
  //     return ApiResponse.notFound({
  //       message: 'Can not get apkFs',
  //       error: 'invalid apk',
  //       code: 401,
  //     });
  //   }

  //   const apkFs = res.map((item) => ApkMapper.mapRawApkFs(item));

  //   return ApiResponse.success({
  //     apk: apkFs,
  //   });
  // }

  @Get(':id')
  async getDetail(@Param('id') id: string, @UserLanguage() language: string) {
    const res = await this.apksService.getDetail(id, language);
    return ApiResponse.success({
      apk: ApkMapper.mapDetail(res.apk),
    });
  }

  @Get(':id/similar')
  async findSimilar(
    @Param('id') id: string,
    @Query() query: PaginationQuery,
    @UserLanguage() language: string,
  ) {
    const apks = await this.apksService.findSimilar(
      id,
      +query.offset || 0,
      +query.limit || 10,
      language,
    );
    return ApiResponse.success({
      apks: ApkMapper.mapList(apks),
    });
  }

  @Get(':id/versions')
  async getVersions(
    @Param('id') id: string,
    @Query() query: PaginationQuery,
    @UserLanguage() language: string,
  ) {
    const apk = await this.apksService.getApkVersions(
      +id,
      +query.offset || 0,
      +query.limit || 10,
      language,
    );
    return ApiResponse.success({
      apk: ApkMapper.mapOne(apk),
      versions: ApkVersionMapper.mapList(apk.versions),
    });
  }

  @Get(':id/versions/:vId')
  async getVersionDetail(
    @Param() { id, vId },
    @UserLanguage() language: string,
  ) {
    const { apk, variants, version } =
      await this.apksService.getApkVersionDetail(+id, vId, language);
    return ApiResponse.success({
      apk: ApkMapper.mapOne(apk),
      version: ApkVersionMapper.mapDetail(version),
      variants: ApkVariantMapper.mapList(variants),
    });
  }
}
