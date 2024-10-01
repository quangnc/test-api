import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { IsPublic } from 'src/common/decorators';
import { PaginationQuery } from 'src/common/requests/queries';
import { ApiResponse } from 'src/common/api.response';
import { UserLanguage } from 'src/common/decorators/user-language.decorator';
import { News } from './entities/news.entity';

@Controller({
  path: 'news',
  version: '1',
})
@IsPublic()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // File upload configuration
  @Post()
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
  create(
    @Body() createNewsDto: CreateNewsDto,
    @UploadedFile() file: Multer.File,
  ) {
    return this.newsService.create(createNewsDto, file);
  }

  @Get()
  async findAll(
    @Query('language') language: string,
    @Query() query: PaginationQuery,
  ) {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;
    const news = await this.newsService.findAll(offset, limit, language);

    return ApiResponse.success({
      page,
      pageSize: limit,
      total: await News.count(),
      results: news,
    });
  }

  @Get(':id')
  findOne(@Query('language') language: string, @Param('id') id: string) {
    return this.newsService.findOne(+id, language);
  }

  @Patch(':id')
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
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @UploadedFile() file: Multer.File,
  ) {
    return this.newsService.update(+id, updateNewsDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
