import Redis from "ioredis";

const redisConnection = new Redis({
    host: process.env.HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    tls: {}
});

export default redisConnection;