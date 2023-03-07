"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
var Redis = require('ioredis');
exports.redisClient = new Redis('redis://:p04624877644dd85ce9e7c4bf00d4fdc9e39b245b514217622510578809e8edda@ec2-44-207-143-113.compute-1.amazonaws.com:8720', {
    tls: {
        rejectUnauthorized: false
    }
});
//# sourceMappingURL=redis.js.map