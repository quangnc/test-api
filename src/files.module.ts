import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { FilesExceptionFilter } from 'src/common/filters/files.exception';
import { FilesController } from './modules/uploads/files.controller';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilesExceptionFilter,
    },
  ],
  controllers: [FilesController],
})
export class FilesModule {}
