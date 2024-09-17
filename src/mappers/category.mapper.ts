import { Category } from 'modules/categories/entities/category.entity';

export class CategoryMapper {
  static mapOne(cat: Category): Record<string, any> {
    return {
      id: cat.id,
      name: cat.locale?.name,
      key: cat.key,
      description: cat.locale?.description,
    };
  }

  static mapList(cats: Category[]): Record<string, any> {
    return cats.map((u) => this.mapOne(u));
  }
}
