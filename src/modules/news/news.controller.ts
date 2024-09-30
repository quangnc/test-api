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
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('lang') lang: string) {
    return this.newsService.findOne(+id, lang);
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
