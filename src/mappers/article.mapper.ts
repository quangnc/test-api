import { Article } from 'modules/articles/entities/article.entity';
import { UserMapper } from 'src/mappers/user.mapper';
import { uploadUrl } from 'src/utils/app';

export class ArticleMapper {
  static mapOne(article: Article): Record<string, any> {
    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      locale: article.locale,
      views: article.views,
      thumbnail: article.thumbnail ? uploadUrl(article.thumbnail, 'articles') : null,
      description: article.description,
      type: article.type,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }

  static mapDetail(article: Article): Record<string, any> {
    return {
      ...this.mapOne(article),
      content: article.content,
      seoKeywords: article.seoKeywords,
      seoDescription: article.seoDescription,
      author: UserMapper.mapOne(article.author),
    };
  }

  static mapList(articles: Article[]): Record<string, any> {
    if (!articles) {
      return undefined;
    }
    return articles.map((a) => this.mapOne(a));
  }
}
