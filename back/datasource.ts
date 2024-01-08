// database_info.ts

import { DataSource } from "typeorm";

import { User } from './models/users'; 

const connectDB =  new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    synchronize: true,
    entities: [User],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

export default connectDB;