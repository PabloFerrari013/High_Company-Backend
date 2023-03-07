import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Product } from './entities/Product.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST!,
  port: 5432,
  password: process.env.DATABASE_PASSWORD!,
  username: process.env.DATABASE_USERNAME!,
  database: process.env.DATABASE!,
  synchronize: true,
  logging: false,
  entities: [Product]
})
