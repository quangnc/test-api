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

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

export const getDescHtml = (desc: string) => {
  if (!isHTML(desc)) {
    return desc;
  }

  return desc.replace(/<\/?[^>]+(>|$)/g, '');
};

const sdk = {
  9: 'Android 2.3+',
  10: 'Android 2.3.3+',
  11: 'Android 3.0+',
  12: 'Android 3.1+',
  13: 'Android 3.2+',
  14: 'Android 4.0+',
  15: 'Android 4.0.3+',
  16: 'Android 4.1+',
  17: 'Android 4.2+',
  18: 'Android 4.3+',
  19: 'Android 4.4+',
  20: 'Android 4.4W+',
  21: 'Android 5.0+',
  22: 'Android 5.1+',
  23: 'Android 6.0+',
  24: 'Android 7.0+',
  25: 'Android 7.1+',
  26: 'Android 8.0+',
  27: 'Android 8.1+',
  28: 'Android 9+',
  29: 'Android 10+',
  30: 'Android 11+',
  31: 'Android 12+',
  32: 'Android 12+',
  33: 'Android 13+',
};
export const sdkVersion = (ver: number) => {
  if (!Object.keys(sdk).includes(String(ver))) {
    return 'Android +';
  }
  return sdk[ver];
};

export const transLink = (url: string): string => {
  if (url.startsWith('https://fs00.apkfind.io:2053/image/')) {
    return url.replace('https://fs00.apkfind.io:2053/image/', '');
  }

  if (url.startsWith('/image/')) {
    return url.replace('/image/', '');
  }

  return url;
};
