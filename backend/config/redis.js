import { Redis } from 'ioredis';

const redisUrl = process.env.REDIS_URL;
export const publisher = new Redis(redisUrl);
export const subscriber = new Redis(redisUrl);
