"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var env_1 = require("./env");
var Product_entity_1 = require("./entities/Product.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.env.DATABASE_HOST,
    port: Number(env_1.env.DATABASE_PORT),
    password: env_1.env.DATABASE_PASSWORD,
    username: env_1.env.DATABASE_USERNAME,
    database: env_1.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Product_entity_1.Product]
});
//# sourceMappingURL=data-source.js.map