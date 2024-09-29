import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documents } from './entities/documents.entity';
import { DocumentsController } from './documents.controller';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [TypeOrmModule.forFeature([Documents])],
  exports: [DocumentsService],
})
export class DocumentsModule {}
