"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
var Redis = require('ioredis');
exports.redisClient = new Redis({
    url: process.env.REDIS_TLS_URL
});
//# sourceMappingURL=redis.js.map