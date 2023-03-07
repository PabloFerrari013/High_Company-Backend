# High Company

High company is a drop-based e-commerce. This repository consists of the server-side ecosystem.

To test or get more information about access the documentation:
Visit the Visite a [documentation](https://high-company.herokuapp.com/docs/)

## Starting project

- Clone project from github:
`
$ git clone https://github.com/PabloFerrari013/High_Company-Backend.git
`
- Go to the root folder and install the libraries: 
`
$ yarn 
or
$ npm install
`
- Create and run a Redis database
- Create an instance on EC2
- Create an .env file with the environment variables:
`
NODE_ENV='application state'
HEADERS_AUTH_TOKEN='authentication token from the request headers to the server'
REDIS_URL='redis database connection url'
DATABASE_TYPE="postgres"
DATABASE_HOST="set database host"
DATABASE_PORT="5432"
DATABASE_PASSWORD="database password"
DATABASE_USERNAME="database username"
DATABASE="database"
`
- run the project with:
`
$ yarn dev
or
$ npm run dev
`
