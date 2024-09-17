import * as bcrypt from 'bcrypt';

/**
 * Hash string
 * @param str ..
 * @returns string
 */
export const hashPassword = (str: string): string => {
  return bcrypt.hashSync(str, 10);
};

/**
 * Compare md5 string
 * @param str ..
 * @param hash ..
 * @returns boolean
 */
export const comparePassword = (str: string, hash: string): boolean => {
  if (!str) return false;
  return bcrypt.compareSync(str, hash);
};
