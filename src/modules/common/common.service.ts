import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from 'modules/common/entities/page.entity';
import { Contact } from 'modules/common/entities/contact.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(Page) public pageRepo: Repository<Page>,
    @InjectRepository(Contact) public contactRepo: Repository<Contact>,
  ) {}

  getPage(page: string): Promise<Page> {
    return this.pageRepo.findOneByOrFail({ page });
  }

  async createContact(body) {
    const contact = Contact.create(body);
    await contact.save();
  }
}
