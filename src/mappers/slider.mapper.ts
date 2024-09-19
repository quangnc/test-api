import { Slider } from 'modules/sliders/entities/slider.entity';

export class SliderMapper {
  static mapOne(slider: Slider): Record<string, any> {
    return {
      id: slider.id,
      title: slider.title,
      url: slider.url,
    };
  }

  static mapList(sliders: Slider[]): Record<string, any> {
    return sliders.map((s) => this.mapOne(s));
  }
}
