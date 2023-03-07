"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
var env_1 = require("../env");
var Redis = require('ioredis');
exports.redisClient = new Redis({
    url: env_1.env.REDIS_URL
});
//# sourceMappingURL=redis.js.map