import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Product } from './entities/Product.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db.c8q6okk3dbny.sa-east-1.rds.amazonaws.com',
  port: 5432,
  password: 'CkpckuAopJBgwTttPEQe',
  username: 'postgres',
  database: 'db',
  synchronize: true,
  logging: false,
  entities: [Product]
})
