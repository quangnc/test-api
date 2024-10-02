import { diskStorage, Multer } from 'multer';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

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
      sliders: SliderMapper.mapList(sliders),
    });
  }

  @Post('/sliders')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/news',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createSliders(
    @Body() body: CreateSliderBody,
    @UploadedFile() file: Multer.File,
  ) {
    const sliders = await this.slidersService.createSliders(body, file);
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
