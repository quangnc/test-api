import { Multer } from 'multer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documents } from './entities/documents.entity';
import { CreateDocumentDto } from './requests/queries';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Documents) public docRepo: Repository<Documents>,
  ) {}

  async findAll(offset: number, limit: number) {
    const documents = await this.docRepo.findAndCount({
      skip: offset,
      take: limit,
    });

    return documents;
  }

  async create(
    createDocumentDto: CreateDocumentDto,
    file: Multer.File,
  ): Promise<Documents> {
    const document = this.docRepo.create({
      ...createDocumentDto, // Lưu các trường name, description
      url: file.path, // Lưu tên file đã upload
    });

    return this.docRepo.save(document);
  }

  async getDetail(id: string) {
    const apk = await this.docRepo.findOneOrFail({
      where: {
        id: +id,
      },
    });
    return apk;
  }

  async remove(id: number) {
    const doc = await this.docRepo.findOneByOrFail({
      id,
    });

    await Documents.delete(doc.id);
    return true;
  }

  async update(
    id: number,
    updateDocumentDto: CreateDocumentDto,
    file: Multer.File,
  ): Promise<Documents> {
    const document = await this.docRepo.findOneOrFail({
      where: { id },
    });

    const newsData = { ...updateDocumentDto };

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    if (file) {
      newsData.url = file.path; // Handle the file if uploaded
    }

    Object.assign(document, newsData);

    return this.docRepo.save(document);
  }
}
