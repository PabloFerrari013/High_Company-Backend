"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var zod_1 = require("zod");
var envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('production'),
    PORT: zod_1.z.number().default(3333),
    HEADERS_AUTH_TOKEN: zod_1.z.string(),
    REDIS_URL: zod_1.z.string(),
    DATABASE_TYPE: zod_1.z.literal('postgres'),
    DATABASE_HOST: zod_1.z.string(),
    DATABASE_PORT: zod_1.z.string(),
    DATABASE_PASSWORD: zod_1.z.string(),
    DATABASE_USERNAME: zod_1.z.string(),
    DATABASE: zod_1.z.string()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('⚠ Invalid environment variable: ' + _env.error.format());
    throw new Error('⚠ Invalid environment variable: ' + _env.error.format());
}
exports.env = _env.data;
//# sourceMappingURL=index.js.map