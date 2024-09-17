import { Publisher } from 'modules/apks/entities/publisher.entity';

export class PublisherMapper {
  static mapOne(publisher: Publisher): Record<string, any> {
    return {
      id: publisher.id,
      name: publisher.name,
      avatar: publisher.avatar,
      description: publisher.description,
    };
  }

  static mapList(publishers: Publisher[]): Record<string, any> {
    return publishers.map((u) => this.mapOne(u));
  }
}
