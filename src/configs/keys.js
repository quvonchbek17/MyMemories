import dotenv from "dotenv";
const {env} = process

dotenv.config()


const configs = {
    PORT: env.APP_PORT,
    DB_HOST: env.DB_HOST,
    DB_USER: env.DB_USER,
    DB_PORT: env.DB_PORT,
    DB_PASSWORD: env.DB_PASSWORD,
    DATABASE: env.DATABASE,
    NODE_ENV: env.NODE_ENV,
    JWT_KEY: env.JWT_KEY,
    DB_CONNECTION_URL: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DATABASE}`
}

export default configs;