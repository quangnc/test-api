import { ApkScreenshot } from 'modules/apks/entities/apk-screenshot.entity';

export class ApkScreenshotMapper {
  static mapOne(screenshot: ApkScreenshot): Record<string, any> {
    return {
      id: screenshot.id,
      mediaType: screenshot.mediaType,
      url: screenshot.url,
      priority: screenshot.priority,
      imageType: screenshot.imageType,
      w: screenshot.width ?? 0,
      h: screenshot.height ?? 0,
      fifeUrlOptions: screenshot.fifeUrlOptions,
    };
  }

  static mapList(screenshots: ApkScreenshot[]): Record<string, any> {
    return screenshots.map((s) => this.mapOne(s));
  }
}
