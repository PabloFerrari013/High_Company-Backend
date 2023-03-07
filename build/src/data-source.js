"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Product_entity_1 = require("./entities/Product.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'db.c8q6okk3dbny.sa-east-1.rds.amazonaws.com',
    port: 5432,
    password: 'CkpckuAopJBgwTttPEQe',
    username: 'postgres',
    database: 'db',
    synchronize: true,
    logging: false,
    entities: [Product_entity_1.Product]
});
//# sourceMappingURL=data-source.js.map