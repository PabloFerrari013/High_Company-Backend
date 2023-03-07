"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
var Redis = require('ioredis');
exports.redisClient = new Redis(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=redis.js.map