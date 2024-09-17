/**
 * Generate password from allowed word
 */
const digits = '0123456789';
const alphabets = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = alphabets.toUpperCase();
const specialChars = '#!&@';

export function randNumber(min, max) {
  const random = Math.random();
  return Math.floor(random * (max - min) + min);
}

/**
 * Generate OTP of the length
 * @param  {number} length length of password.
 * @param  {object} options
 * @param  {boolean} options.digits Default: `true` true value includes digits in OTP
 * @param  {boolean} options.alphabets Default: `true` true value includes alphabets in OTP
 * @param  {boolean} options.upperCase Default: `true` true value includes upperCase in OTP
 * @param  {boolean} options.specialChars Default: `true` true value includes specialChars in OTP
 */

interface GeneratorOptions {
  digits?: boolean | undefined;
  alphabets?: boolean | undefined;
  upperCase?: boolean | undefined;
  specialChars?: boolean | undefined;
}

export function randomGenerator(
  length: number,
  options: GeneratorOptions = {},
) {
  length = length || 10;
  const generateOptions = options || <GeneratorOptions>{};

  generateOptions.digits = Object.prototype.hasOwnProperty.call(
    generateOptions,
    'digits',
  )
    ? options.digits
    : true;
  generateOptions.alphabets = Object.prototype.hasOwnProperty.call(
    generateOptions,
    'alphabets',
  )
    ? options.alphabets
    : false;
  generateOptions.upperCase = Object.prototype.hasOwnProperty.call(
    generateOptions,
    'upperCase',
  )
    ? options.upperCase
    : false;
  generateOptions.specialChars = Object.prototype.hasOwnProperty.call(
    generateOptions,
    'specialChars',
  )
    ? options.specialChars
    : false;

  const allowsChars =
    ((generateOptions.digits || '') && digits) +
    ((generateOptions.alphabets || '') && alphabets) +
    ((generateOptions.upperCase || '') && upperCase) +
    ((generateOptions.specialChars || '') && specialChars);
  let password = '';
  while (password.length < length) {
    const charIndex = randNumber(0, allowsChars.length - 1);
    password += allowsChars[charIndex];
  }
  return password;
}
