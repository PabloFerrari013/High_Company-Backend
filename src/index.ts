import { AppDataSource } from './data-source'
import 'express-async-errors'
import { router } from './routes'
import express = require('express')
import * as bodyParser from 'body-parser'
import swagger from 'swagger-ui-express'
import cors = require('cors')
import swaggerDocs from './swagger.json'
import { env } from './env'

// create express app
const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// leaving the application public
app.use(cors())

// managing routes
app.use(router)

// documentation route
app.use('/docs', swagger.serve, swagger.setup(swaggerDocs))

// start express server
const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`Server running on port: ${port} 🚀`)
})

// initializing database
AppDataSource.initialize()
  .then(() => console.log('Database initialized 🔥'))
  .catch(error => console.log(error))
