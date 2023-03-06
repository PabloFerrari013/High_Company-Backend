import request from 'supertest'
import { env } from '../src/env'

const productData = {
  name: 'kit calças jeans',
  price: 12345,
  img_URL: 'https://cf.shopee.com.br/file/f33ebd0929a0bfdaac51b3b61426bfc9',
  stock: 10
}

var commonHeaders = {
  'Content-Type': 'application/json',
  'x-high-auth': env.HEADERS_AUTH_TOKEN
}

describe('Create a new product', () => {
  it('should create a new product', async () => {
    await request(`http://localhost:${env.PORT}`)
      .post('/xpto/products')
      .set(commonHeaders)
      .send(productData)
      .expect(201)
  })

  it('should not be able to create a product without authentication', async () => {
    await request(`http://localhost:${env.PORT}`)
      .post('/xpto/products')
      .send(productData)
      .expect(401)
  })
})

describe('Find all products', () => {
  it('should be able to list all products', async () => {
    await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products')
      .set(commonHeaders)
      .expect(200)
  })

  it('should not be able to list all products without authentication', async () => {
    await request(`http://localhost:${env.PORT}`)
      .post('/xpto/products')
      .expect(401)
  })
})

describe('Find a product', () => {
  it('should be able to find a product', async () => {
    const res = await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products')
      .set(commonHeaders)
      .expect(200)

    const products = JSON.parse(res.text).products

    const id = products[0].id

    await request(`http://localhost:${env.PORT}`)
      .get(`/xpto/products/${id}`)
      .set(commonHeaders)
      .expect(200)
  })

  it('should not be able to find a product with incorrect id', async () => {
    await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products/incorrect-id')
      .set(commonHeaders)
      .expect(404)
  })

  it('should not be able to find a product without authentication', async () => {
    const res = await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products')
      .set(commonHeaders)
      .expect(200)

    const products = JSON.parse(res.text).products

    const id = products[0].id

    await request(`http://localhost:${env.PORT}`)
      .get(`/xpto/products/${id}`)
      .expect(401)
  })
})

describe('Edit a product', () => {
  it('should be able to edit a product', async () => {
    const res = await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products')
      .set(commonHeaders)
      .expect(200)

    const products = JSON.parse(res.text).products

    const id = products[products.length - 1].id

    await request(`http://localhost:${env.PORT}`)
      .put(`/xpto/products/${id}`)
      .set(commonHeaders)
      .send(productData)
      .expect(200)
  })

  it('should not be able to edit a product with incorrect id', async () => {
    await request(`http://localhost:${env.PORT}`)
      .put('/xpto/products/incorrect-id')
      .set(commonHeaders)
      .send(productData)
      .expect(404)
  })

  it('should not be able to edit a product without authentication', async () => {
    const res = await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products')
      .set(commonHeaders)
      .expect(200)

    const products = JSON.parse(res.text).products

    const id = products[products.length - 1].id

    await request(`http://localhost:${env.PORT}`)
      .put(`/xpto/products/${id}`)
      .send(productData)
      .expect(401)
  })
})

describe('Delete a product', () => {
  it('should be able to delete a product', async () => {
    const res = await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products')
      .set(commonHeaders)
      .expect(200)

    const products = JSON.parse(res.text).products

    const id = products[products.length - 1].id

    await request(`http://localhost:${env.PORT}`)
      .delete(`/xpto/products/${id}`)
      .set(commonHeaders)
      .expect(200)
  })

  it('should not be able to delete a product with incorrect id', async () => {
    await request(`http://localhost:${env.PORT}`)
      .delete('/xpto/products/incorrect-id')
      .set(commonHeaders)
      .expect(404)
  })

  it('should not be able to delete a product without authentication', async () => {
    const res = await request(`http://localhost:${env.PORT}`)
      .get('/xpto/products')
      .set(commonHeaders)
      .expect(200)

    const products = JSON.parse(res.text).products

    const id = products[products.length - 1].id

    await request(`http://localhost:${env.PORT}`)
      .delete(`/xpto/products/${id}`)
      .expect(401)
  })
})
