import { Tag } from 'src/modules/tags/entities/tag.entity';

export class TagsMapper {
  static mapOne(tag: Tag): string {
    return tag.name;
  }

  static mapList(tags: Tag[]): string[] {
    return tags.map((u) => this.mapOne(u));
  }
}
