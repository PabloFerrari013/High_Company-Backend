const Redis = require('ioredis')

export const redisClient = new Redis({
  url: process.env.REDIS_TLS_URL
})
