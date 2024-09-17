import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { ApiResponse } from 'src/common/api.response';
import { IsPublic } from 'src/common/decorators';
import { ApkType } from '../apks/entities/apk.entity';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { CategoryMapper } from 'src/mappers/category.mapper';
import { SlidersService } from 'modules/sliders/sliders.service';
import { SliderMapper } from 'src/mappers/slider.mapper';
import { enumValues } from 'src/utils/array';
import { ApkTopList } from 'modules/apks/enums';
import { ApkMapper } from 'src/mappers/apk.mapper';
import { ApksService } from 'modules/apks/services/apks.service';
import { CommonService } from 'modules/common/common.service';
import { PageType } from 'modules/common/entities/page.entity';
import {
  CreateContactBody,
  ListTopQuery,
} from 'modules/common/requests/bodies';
import { SourceApk } from 'src/common/enums';
import { ListTopService } from 'modules/apks/services/list-top.service';
import { ListTopMapper } from 'src/mappers/list-top.mapper';

@Controller({
  path: '/',
  version: '1',
})
@IsPublic()
export class CommonController {
  constructor(
    private readonly catService: CategoriesService,
    private readonly slidersService: SlidersService,
    private readonly apksService: ApksService,
    private readonly apkListTopService: ListTopService,
    private readonly commonService: CommonService,
  ) {}

  @Get('/categories')
  async getCategories(@UserLanguage() language: string) {
    const appCats = await this.catService.findAllByType(ApkType.app, language);
    const gameCats = await this.catService.findAllByType(
      ApkType.game,
      language,
    );
    return ApiResponse.success({
      gameCategories: CategoryMapper.mapList(gameCats),
      appCategories: CategoryMapper.mapList(appCats),
    });
  }

  @Get('/sliders')
  async getSliders(@UserLanguage() language) {
    const sliders = await this.slidersService.findAll(language);
    return ApiResponse.success({
      sliders: SliderMapper.mapList(sliders),
    });
  }

  @Get('home')
  async getHome(@UserLanguage() language) {
    const excludeLists = [
      ApkTopList.popular24h,
      ApkTopList.reviews,
      ApkTopList.downloads,
      ApkTopList.ratings,
    ];
    const supportList = enumValues(ApkTopList).filter(
      (e) => !excludeLists.includes(e as any),
    );
    const getList = (list, type) =>
      this.apksService.listTop(
        0,
        list == ApkTopList.preRegister ? 8 : 6,
        list,
        null,
        type,
        language,
      );

    const returnLists = {};
    for (const list of supportList) {
      returnLists[list] = {
        apps: ApkMapper.mapRawList(await getList(list, ApkType.app)),
        games: ApkMapper.mapRawList(await getList(list, ApkType.game)),
      };
    }

    return ApiResponse.success(returnLists);
  }

  @Get('/list-top')
  async getHomeByCategory(
    @Query() query: ListTopQuery,
    @UserLanguage() language,
  ) {
    if (query.source === SourceApk.INTERNAL) {
      const data = await this.apksService.listTop(
        +query.offset || 0,
        +query.limit || 10,
        query.title,
        null,
        query.type,
        language,
      );
      return ApiResponse.success({ apks: data });
    }

    const data = await this.apkListTopService.listTop(
      query.keyword,
      +query.offset || 0,
      +query.limit || 10,
      query.sortBy || 'createdAt',
      query.order,
      query.type,
      query.top,
      language,
    );
    return ApiResponse.success({ apks: ListTopMapper.mapList(data) });
  }

  @Get('pages/:page')
  async getPageContent(@Param('page') page: string) {
    if (!enumValues(PageType).includes(page)) {
      return ApiResponse.badRequest({
        message: `Available pages: ${enumValues(PageType).join(', ')}`,
        error: 'notFound',
      });
    }
    const pageObj = await this.commonService.getPage(page);
    return ApiResponse.success({
      page: pageObj,
    });
  }

  @Post('/contact')
  async postContact(@Body() body: CreateContactBody) {
    await this.commonService.createContact(body);
    return ApiResponse.success({
      message: 'Created contact',
    });
  }
}
