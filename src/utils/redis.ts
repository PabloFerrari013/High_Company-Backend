import { redisClient } from '../lib/redis'

interface SetRedis {
  key: string
  value: string
}

interface GetRedis {
  key: string
}

interface GetRedisResponse {
  status: 'not found' | 'stale' | 'validate'
  data: string
}

export async function setRedis({ key, value }: SetRedis) {
  await redisClient.set(key, value)
  await redisClient.set(`${key}:validation`, 'true', 'EX', 60)
  await redisClient.del(`${key}:refetching`)
}

export async function getRedis({ key }: GetRedis): Promise<GetRedisResponse> {
  const data = await redisClient.get(key)

  if (!data) {
    await redisClient.set(`${key}:refetching`, 'true')
    return { status: 'not found', data: '' }
  }

  const isCacheStale = await redisClient.get(`${key}:validation`)

  if (!isCacheStale) {
    await redisClient.set(`${key}:refetching`, 'true')
    return { status: 'stale', data }
  }

  return { status: 'validate', data }
}
