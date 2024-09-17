import { uploadUrl } from 'src/utils/app';
import { Slider } from 'modules/sliders/entities/slider.entity';

export class SliderMapper {
  static mapOne(slider: Slider): Record<string, any> {
    return {
      id: slider.id,
      title: slider.apkId ? slider.apk?.info.name : slider.title,
      url: slider.url,
      image: slider.apkId ? slider.apk?.info.featureImage : uploadUrl(slider.image, 'sliders'),
      description: slider.apkId ? slider.apk?.info.description : slider.description,
      apkId: slider.apk?.id,
      isInternal: slider.apk != null,
      packageId: slider.apk?.packageName,
      slug: slider.apk?.slug,
    };
  }

  static mapList(sliders: Slider[]): Record<string, any> {
    return sliders.map((s) => this.mapOne(s));
  }
}
