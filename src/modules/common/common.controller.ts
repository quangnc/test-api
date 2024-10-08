import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse } from 'src/common/api.response';
import { IsPublic } from 'src/common/decorators';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { SlidersService } from 'modules/sliders/sliders.service';
import { SliderMapper } from 'src/mappers/slider.mapper';
import { enumValues } from 'src/utils/array';

import { CommonService } from 'modules/common/common.service';
import { PageType } from 'modules/common/entities/page.entity';
import {
  CreateContactBody,
  CreateSliderBody,
} from 'modules/common/requests/bodies';

@Controller({
  path: '/',
  version: '1',
})
@IsPublic()
export class CommonController {
  constructor(
    private readonly slidersService: SlidersService,
    private readonly commonService: CommonService,
  ) {}

  @Get('/sliders')
  async getSliders(@UserLanguage() language) {
    const sliders = await this.slidersService.findAll(language);
    return ApiResponse.success({
      sliders,
    });
  }

  @Post('/sliders')
  async createSliders(@Body() body: CreateSliderBody) {
    const sliders = await this.slidersService.createSliders(body);
    return ApiResponse.success({
      sliders,
    });
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
