import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Database URL
 */
export const DATABASE_URL = process.env.POSTGRES_URL;

/**
 * Redis URL
 */
export const REDIS_ENABLE = process.env.REDIS_ENABLE == 'true';
export const REDIS_API_URL = process.env.REDIS_API_URL;
export const REDIS_ADMIN_URL = process.env.REDIS_ADMIN_URL;

/**
 * Api server port and ip
 */
export const API_SERVER_PORT = process.env.API_PORT || 443;
export const API_SERVER_IP = process.env.API_IP || 'localhost';

/**
 * Upload server port and ip
 */
export const FILES_SERVER_PORT = process.env.FILES_PORT || 2087;
export const FILES_SERVER_IP = process.env.FILES_IP || 'localhost';

/**
 * JWT secret
 */
export const JWT_SECRET = process.env.JWT_SECRET;

/**
 * JWT Alive time
 */
export const JWT_ALIVE_TIME = 604800;

/**
 * Mail transport
 */
export const SMTP_TRANSPORT = process.env.SMTP_TRANSPORT;

/**
 * IS dev
 */
export const IS_PRODUCTION = process.env.NODE_ENV == 'production';

/**
 * IS dev
 */
export const API_ALLOW_ORIGINS = process.env.API_ALLOW_ORIGINS || '*';

/**
 * File url
 */
export const FILES_URL = process.env.FILES_URL || 'https://files.apkthink.com';

/**
 * FS url
 */
export const FS_URL = process.env.FS_URL || 'https://fs.apkthink.com';

export const MONGODB_URI = process.env.MONGODB_URI;
