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
    filename: string,
  ): Promise<Documents> {
    const document = this.docRepo.create({
      ...createDocumentDto, // Lưu các trường name, description
      url: filename, // Lưu tên file đã upload
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
    id: string,
    updateDocumentDto: CreateDocumentDto,
  ): Promise<Documents> {
    const document = await this.docRepo.findOneOrFail({
      where: { id: Number(id) },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    // Cập nhật thông tin nếu có trong DTO
    if (updateDocumentDto.name) {
      document.title = updateDocumentDto.name;
    }

    if (updateDocumentDto.description) {
      document.description = updateDocumentDto.description;
    }

    return this.docRepo.save(document);
  }
}
