import { ApkVariant } from 'modules/apks/entities/apk-variant.entity';
import { FS_URL } from 'src/configs';

export class ApkVariantMapper {
  static mapOne(variant: ApkVariant): Record<string, any> {
    return {
      id: variant.id,
      version: variant.version,
      architecture: variant.architecture,
      fileSha1: variant.fileSha1,
      fileType: variant.fileType,
      fileSize: variant.fileSize,
      screenDpi: variant.screenDpi,
      signature: variant.signature,
      downloadUrl: `${FS_URL}/file/${variant.fileId}`,
      requirements: variant.requirements,
    };
  }

  static mapList(variants: ApkVariant[]): Record<string, any> {
    return variants.map((variant) => this.mapOne(variant));
  }
}
