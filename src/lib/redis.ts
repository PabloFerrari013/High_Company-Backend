import {env} from '../env'
const Redis = require('ioredis');

export const redisClient = new Redis({
  url: env.REDIS_URL
});


