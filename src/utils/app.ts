import { FILES_URL } from 'src/configs';

/**
 * Return full url from a path
 * @param path
 * @param folder
 */
export function uploadUrl(path: string, folder: string = null) {
  if (!path) {
    return undefined;
  }
  if (!folder) {
    return `${FILES_URL}/uploads/${path}`;
  }
  return `${FILES_URL}/uploads/${folder}/${path}`;
}

/**
 * Date to sql timestamp
 * @param d
 */
export function dateToSqlTimestamp(d: Date) {
  return d.toISOString().replace('Z', '').replace('T', ' ');
}

/**
 * String to hex
 * @param str
 */
export function strToHex(str: string) {
  return str
    .split('')
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
}
