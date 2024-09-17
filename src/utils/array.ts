/**
 * String to array
 * @param str
 * @param separator
 */
export function strToArray(str, separator = ',') {
  if (!str) {
    return [];
  }
  return str.split(separator).map((e) => e.trim());
}

/**
 * Random an item
 * @param array
 */
export function randomItem(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Enum values
 * @param enumType
 */
export function enumValues(enumType) {
  return Object.keys(enumType)
    .map((key) => enumType[key])
    .filter((value) => typeof value === 'string') as string[];
}

/**
 * group array as children
 * @param targetArr
 * @param sourceArr
 * @param key
 * @param comparator
 */
export function groupArrayAsChild<T, S>(
  targetArr: T[],
  sourceArr: S[],
  key: string,
  comparator: (t: T, s: S) => boolean,
) {
  for (const target of targetArr) {
    target[key] = sourceArr.filter((s) => comparator(target, s));
  }
  return targetArr;
}
