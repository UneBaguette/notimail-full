// database_info.ts

import { DataSource } from "typeorm";

import { User } from './models/users'; 

const connectDB =  new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'notimail',
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