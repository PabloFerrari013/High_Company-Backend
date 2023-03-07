const Redis = require('ioredis')

export const redisClient = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false
  }
})
