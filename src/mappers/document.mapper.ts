import { Documents } from 'src/modules/documents/entities/documents.entity';

export class DocumentMapper {
  static mapOne(doc: Documents): Record<string, any> {
    return {
      id: doc.id,
      name: doc.title,
      url: doc.url,
      description: doc.description,
    };
  }

  static mapList(docs: Documents[]): Record<string, any> {
    return docs.map((doc) => this.mapOne(doc));
  }
}
