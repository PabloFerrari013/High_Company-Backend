import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { env } from './env'
import { Product } from './entities/Product.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  password: env.DATABASE_PASSWORD,
  username: env.DATABASE_USERNAME,
  database: env.DATABASE,
  synchronize: true,
  logging: false,
  entities: [Product]
})
