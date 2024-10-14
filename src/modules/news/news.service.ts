import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
import { NewsLocales } from './entities/news-locales.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { slugify } from 'src/utils';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
    @InjectRepository(NewsLocales)
    private readonly newsLocalesRepository: Repository<NewsLocales>,
  ) {}

  // Create a news article with translations
  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const { locales, ...newsData } = createNewsDto;
    const slug = slugify(locales['en'].title);
    // File handling (e.g., save file path to `url` field)
    const news = this.newsRepository.create(newsData);
    news.locales = locales.map((locale) =>
      this.newsLocalesRepository.create(locale),
    );

    return this.newsRepository.save({ ...news, slug });
  }

  // Find all news articles with translations
  async findAll(
    offset: number,
    limit: number,
    locale: string,
    type?: number,
    search?: string,
  ) {
    const queryBuilder = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.locales', 'newsLocales');

    // Nếu có `locale` thì filter theo locale
    if (locale) {
      queryBuilder.andWhere('newsLocales.locale = :locale', { locale });
    }

    if (search) {
      queryBuilder.andWhere('newsLocales.title ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (type) {
      queryBuilder.andWhere('news.type = :type', { type });
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

  async findBySlug(slug: string): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { slug } });
    if (!news) {
      throw new NotFoundException(`News with slug '${slug}' not found`);
    }

    news.count += 1;
    await this.newsRepository.save(news);

    return news;
  }

  // Update a news article with translations and file upload
  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    const { locales, ...newsData } = updateNewsDto;

    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['locales'],
    });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    Object.assign(news, newsData);
    let oldSlug = news.slug;
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
          const newLocale = this.newsLocalesRepository.create({ ...localeDto });
          news.locales.push(newLocale);
          oldSlug = slugify(locales['en'].title);
        }
      }
    }

    return this.newsRepository.save({ ...news, slug: oldSlug });
  }

  // Delete a news article
  async remove(id: number): Promise<void> {
    const news = await this.newsRepository.findOne({ where: { id: id } });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    await this.newsLocalesRepository.delete({ newsId: id });
    await this.newsRepository.delete(id);
  }
}
