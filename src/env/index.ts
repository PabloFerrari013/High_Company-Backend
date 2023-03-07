import { config } from 'dotenv'
config()
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.number().default(3333),
  HEADERS_AUTH_TOKEN: z.string(),
  REDIS_URL: z.string(),
  DATABASE_TYPE: z.literal('postgres'),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE: z.string()
})

console.log(process.env)

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠ Invalid environment variable: ' + _env.error.format())

  throw new Error('⚠ Invalid environment variable: ' + _env.error.format())
}

export const env = _env.data
