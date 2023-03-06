import express = require('express')
import * as ProductController from './controllers/ProductController'
import { authenticate } from './middlewares/authentications'

const router = express.Router()

router.post('/xpto/products', authenticate, ProductController.create)

router.get('/xpto/products', authenticate, ProductController.findAll)

router.get('/xpto/products/:id', authenticate, ProductController.findOne)

router.put('/xpto/products/:id', authenticate, ProductController.edit)

router.delete('/xpto/products/:id', authenticate, ProductController.remove)

export { router }
