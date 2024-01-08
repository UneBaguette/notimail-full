// database_info.ts

import { DataSource } from "typeorm";

import { User } from './models/users'; 

const connectDB =  new DataSource({
    type: 'mysql',
    host: process.env.DBHOST,
    port: 3306,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
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