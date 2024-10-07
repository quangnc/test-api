import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { IsPublic } from 'src/common/decorators';

@Controller({
  path: 'files',
  version: '1',
})
@IsPublic()
export class FilesController {
  @Post('/news')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/news', // Save files to uploads directory
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Multer.File) {
    return {
      message: 'File uploaded successfully!',
      fileUrl: `/uploads/news/87ce9f97447b342f06e6a38e481d58a4.xlsx${file.filename}`,
    };
  }

  @Post('/partners')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/partners', // Save files to uploads directory
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFilePartners(@UploadedFile() file: Multer.File) {
    return {
      message: 'File uploaded successfully!',
      fileUrl: `/uploads/partners/${file.filename}`,
    };
  }

  @Post('/docs')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/docs', // Save files to uploads directory
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFileDocs(@UploadedFile() file: Multer.File) {
    return {
      message: 'File uploaded successfully!',
      fileUrl: `/uploads/docs/${file.filename}`,
    };
  }
}
