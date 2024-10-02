import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { NewsLocales } from './entities/news-locales.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Multer } from 'multer';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
    @InjectRepository(NewsLocales)
    private readonly newsLocalesRepository: Repository<NewsLocales>,
  ) {}

  // Create a news article with translations
  async create(createNewsDto: CreateNewsDto, file: Multer.File): Promise<News> {
    const { locales, ...newsData } = createNewsDto;
    // File handling (e.g., save file path to `url` field)
    if (file) {
      newsData.url = file.path; // You can adjust how to store the file
    }
    const news = this.newsRepository.create(newsData);
    news.locales = locales.map((locale) =>
      this.newsLocalesRepository.create(locale),
    );

    return this.newsRepository.save(news);
  }

  // Find all news articles with translations
  async findAll(
    offset: number,
    limit: number,
    locale: string,
    search?: string,
  ) {
    const queryBuilder = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.locales', 'newsLocales');

    // Nếu có `locale` thì filter theo locale
    if (locale) {
      console.log('locale', locale);
      queryBuilder.andWhere('newsLocales.locale = :locale', { locale });
    }

    if (search) {
      queryBuilder.andWhere('newsLocales.title ILIKE :search', {
        search: `%${search}%`,
      });
    }
    queryBuilder.orderBy('news.createdAt', 'DESC').take(limit).skip(offset);

    return queryBuilder.getMany();
  }

  // Find one news article with its translation by language
  async findOne(id: number, lang: string = 'vi') {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['locales'],
    });

    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    const translation = news.locales.find((t) => t.locale === lang);

    if (!translation) {
      throw new NotFoundException(`Translation for language ${lang} not found`);
    }

    news.count += 1;
    await this.newsRepository.save(news);

    return { ...news, ...translation };
  }

  // Update a news article with translations and file upload
  async update(
    id: number,
    updateNewsDto: UpdateNewsDto,
    file: Multer.File,
  ): Promise<News> {
    const { locales, ...newsData } = updateNewsDto;

    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['locales'],
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    if (file) {
      newsData.url = file.path; // Handle the file if uploaded
    }

    Object.assign(news, newsData);

    if (locales && locales.length > 0) {
      // Duyệt qua từng `locale` trong DTO và xử lý cập nhật
      for (const localeDto of locales) {
        const existingLocale = news.locales.find(
          (l) => l.locale === localeDto.locale,
        );

        if (existingLocale) {
          // Nếu locale đã tồn tại, cập nhật thông tin
          Object.assign(existingLocale, localeDto);
        } else {
          // Nếu locale chưa tồn tại, tạo mới
          const newLocale = this.newsLocalesRepository.create(localeDto);
          news.locales.push(newLocale);
        }
      }
    }

    return this.newsRepository.save(news);
  }

  // Delete a news article
  async remove(id: number): Promise<void> {
    const news = await this.newsRepository.findOne({ where: { id: id } });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    await this.newsRepository.remove(news);
  }
}
