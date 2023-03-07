"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.edit = exports.create = exports.findOne = exports.findAll = void 0;
var data_source_1 = require("../data-source");
var Product_entity_1 = require("../entities/Product.entity");
var zod_1 = require("zod");
var redis_1 = require("../utils/redis");
function findAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var productsRedisExists, products, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, (0, redis_1.getRedis)({ key: 'all_products' })];
                case 1:
                    productsRedisExists = _a.sent();
                    if (productsRedisExists.status === 'validate') {
                        return [2 /*return*/, res.json({ products: JSON.parse(productsRedisExists.data) })];
                    }
                    if (productsRedisExists.status === 'stale') {
                        res.json({ products: JSON.parse(productsRedisExists.data) });
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).find()];
                case 2:
                    products = _a.sent();
                    return [4 /*yield*/, (0, redis_1.setRedis)({ key: 'all_products', value: JSON.stringify(products) })];
                case 3:
                    _a.sent();
                    if (productsRedisExists.status === 'not found') {
                        res.json({ products: products });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res
                        .status(500)
                        .send('There was an error on the server when trying to make a request');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findAll = findAll;
function findOne(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, envSchema, productRedisExists, productsRedisExists, productExists, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    id = req.params.id;
                    envSchema = zod_1.z.object({
                        id: zod_1.z.string()
                    });
                    envSchema.safeParse(id);
                    return [4 /*yield*/, (0, redis_1.getRedis)({ key: "product_".concat(id) })];
                case 1:
                    productRedisExists = _a.sent();
                    return [4 /*yield*/, (0, redis_1.getRedis)({ key: 'all_products' })];
                case 2:
                    productsRedisExists = _a.sent();
                    if (productRedisExists.status === 'validate' &&
                        productsRedisExists.status === 'validate') {
                        return [2 /*return*/, res.json({ product: JSON.parse(productRedisExists.data) })];
                    }
                    if (productsRedisExists.status === 'stale') {
                        res.json({ product: JSON.parse(productRedisExists.data) });
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).findOne({
                            where: { id: id }
                        })];
                case 3:
                    productExists = _a.sent();
                    if (!productExists) {
                        return [2 /*return*/, res.status(404).send('The specified product id does not exist')];
                    }
                    res.json({ product: productExists });
                    if (!(productRedisExists.status === 'not found')) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, redis_1.setRedis)({
                            key: "product_".concat(id),
                            value: JSON.stringify(productExists)
                        })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/, res
                            .status(500)
                            .send('There was an error on the server when trying to make a request')];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.findOne = findOne;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data, envSchema, products, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    data = req.body;
                    envSchema = zod_1.z.object({
                        name: zod_1.z.string(),
                        price: zod_1.z.number(),
                        img_URL: zod_1.z.string(),
                        stock: zod_1.z.number()
                    });
                    envSchema.safeParse(data);
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).save(data)];
                case 1:
                    _a.sent();
                    res.status(201).send();
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).find()];
                case 2:
                    products = _a.sent();
                    return [4 /*yield*/, (0, redis_1.setRedis)({ key: 'all_products', value: JSON.stringify(products) })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.log(error_3);
                    res
                        .status(500)
                        .send('There was an error on the server when trying to make a request');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
function edit(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, data, envSchema, productExists, products, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    id = req.params.id;
                    data = req.body;
                    envSchema = zod_1.z.object({
                        id: zod_1.z.string(),
                        name: zod_1.z.string(),
                        price: zod_1.z.number(),
                        img_URL: zod_1.z.number(),
                        stock: zod_1.z.number()
                    });
                    envSchema.safeParse(__assign(__assign({}, data), { id: id }));
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).findOne({
                            where: { id: id }
                        })];
                case 1:
                    productExists = _a.sent();
                    if (!productExists) {
                        return [2 /*return*/, res.status(404).send('The specified product id does not exist')];
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.createQueryBuilder()
                            .update(Product_entity_1.Product)
                            .set(__assign({}, data))
                            .where({ id: productExists.id })
                            .execute()];
                case 2:
                    _a.sent();
                    res.send();
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).find()];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, (0, redis_1.setRedis)({ key: 'all_products', value: JSON.stringify(products) })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.log(error_4);
                    res
                        .status(500)
                        .send('There was an error on the server when trying to make a request');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.edit = edit;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, envSchema, productExists, products, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    id = req.params.id;
                    envSchema = zod_1.z.object({
                        id: zod_1.z.string()
                    });
                    envSchema.safeParse(id);
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).findOne({
                            where: { id: id }
                        })];
                case 1:
                    productExists = _a.sent();
                    if (!productExists) {
                        return [2 /*return*/, res.status(404).send('The specified product id does not exist')];
                    }
                    return [4 /*yield*/, data_source_1.AppDataSource.createQueryBuilder()
                            .delete()
                            .from(Product_entity_1.Product)
                            .where({ id: id })
                            .execute()];
                case 2:
                    _a.sent();
                    res.send();
                    return [4 /*yield*/, data_source_1.AppDataSource.getRepository(Product_entity_1.Product).find()];
                case 3:
                    products = _a.sent();
                    return [4 /*yield*/, (0, redis_1.setRedis)({ key: 'all_products', value: JSON.stringify(products) })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [2 /*return*/, res
                            .status(500)
                            .send('There was an error on the server when trying to make a request')];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
//# sourceMappingURL=ProductController.js.map