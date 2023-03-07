"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Product_entity_1 = require("./entities/Product.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: 5432,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Product_entity_1.Product]
});
//# sourceMappingURL=data-source.js.map