import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { FilesExceptionFilter } from 'src/common/filters/files.exception';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilesExceptionFilter,
    },
  ],
})
export class FilesModule {}
