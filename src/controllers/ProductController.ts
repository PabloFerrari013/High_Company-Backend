import { AppDataSource } from '../data-source'
import { Request, Response } from 'express'
import { Product } from '../entities/Product.entity'
import { z } from 'zod'
import { setRedis, getRedis } from '../utils/redis'

export async function findAll(req: Request, res: Response) {
  try {
    const productsRedisExists = await getRedis({ key: 'all_products' })

    if (productsRedisExists.status === 'validate') {
      return res.json({ products: JSON.parse(productsRedisExists.data) })
    }

    if (productsRedisExists.status === 'stale') {
      res.json({ products: JSON.parse(productsRedisExists.data) })
    }

    const products = await AppDataSource.getRepository(Product).find()

    await setRedis({ key: 'all_products', value: JSON.stringify(products) })

    if (productsRedisExists.status === 'not found') {
      res.json({ products })
    }
  } catch (error) {
    console.log(error)

    res
      .status(500)
      .send('There was an error on the server when trying to make a request')
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id

    const envSchema = z.object({
      id: z.string()
    })

    envSchema.safeParse(id)

    const productRedisExists = await getRedis({ key: `product_${id}` })

    const productsRedisExists = await getRedis({ key: 'all_products' })

    if (
      productRedisExists.status === 'validate' &&
      productsRedisExists.status === 'validate'
    ) {
      return res.json({ product: JSON.parse(productRedisExists.data) })
    }

    if (productsRedisExists.status === 'stale') {
      res.json({ product: JSON.parse(productRedisExists.data) })
    }

    const productExists = await AppDataSource.getRepository(Product).findOne({
      where: { id }
    })

    if (!productExists) {
      return res.status(404).send('The specified product id does not exist')
    }

    res.json({ product: productExists })

    if (productRedisExists.status === 'not found') {
      await setRedis({
        key: `product_${id}`,
        value: JSON.stringify(productExists)
      })
    }
  } catch (error) {
    console.log(error)

    return res
      .status(500)
      .send('There was an error on the server when trying to make a request')
  }
}

export async function create(req: Request, res: Response) {
  try {
    const data = req.body

    const envSchema = z.object({
      name: z.string(),
      price: z.number(),
      img_URL: z.string(),
      stock: z.number()
    })

    envSchema.safeParse(data)

    await AppDataSource.getRepository(Product).save(data)

    res.status(201).send()

    const products = await AppDataSource.getRepository(Product).find()

    await setRedis({ key: 'all_products', value: JSON.stringify(products) })
  } catch (error) {
    console.log(error)

    res
      .status(500)
      .send('There was an error on the server when trying to make a request')
  }
}

export async function edit(req: Request, res: Response) {
  try {
    const id = req.params.id
    const data = req.body

    const envSchema = z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      img_URL: z.number(),
      stock: z.number()
    })

    envSchema.safeParse({ ...data, id })

    const productExists = await AppDataSource.getRepository(Product).findOne({
      where: { id }
    })

    if (!productExists) {
      return res.status(404).send('The specified product id does not exist')
    }

    await AppDataSource.createQueryBuilder()
      .update(Product)
      .set({ ...data })
      .where({ id: productExists.id })
      .execute()

    res.send()

    const products = await AppDataSource.getRepository(Product).find()

    await setRedis({ key: 'all_products', value: JSON.stringify(products) })
  } catch (error) {
    console.log(error)

    res
      .status(500)
      .send('There was an error on the server when trying to make a request')
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id

    const envSchema = z.object({
      id: z.string()
    })

    envSchema.safeParse(id)

    const productExists = await AppDataSource.getRepository(Product).findOne({
      where: { id }
    })

    if (!productExists) {
      return res.status(404).send('The specified product id does not exist')
    }

    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Product)
      .where({ id })
      .execute()

    res.send()

    const products = await AppDataSource.getRepository(Product).find()

    await setRedis({ key: 'all_products', value: JSON.stringify(products) })
  } catch (error) {
    console.log(error)

    return res
      .status(500)
      .send('There was an error on the server when trying to make a request')
  }
}
