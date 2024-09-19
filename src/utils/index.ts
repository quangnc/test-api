export const slugify = (str: string) =>
  str
    .toLowerCase()
    .replace(':', '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd');

/**
 * Convert to JSON if the prop is a string
 * @param property - A property of an object.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const stringToJSON = (property: any): any => {
  if (typeof property === 'string') {
    return JSON.parse(property);
  }
  return property;
};

export const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

export const getDescHtml = (desc: string) => {
  if (!isHTML(desc)) {
    return desc;
  }

  return desc.replace(/<\/?[^>]+(>|$)/g, '');
};
