import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'mysql',
    host: "process.env.MYSQLDB_HOST",
    port: +process.env.MYSQLDB_DOCKER_PORT,
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    entities: ['dist/src/databases/entity/*.entity.js'],
    migrationsRun: false,
    migrations: [
        "dist/migrations/*{.ts,.js}"
    ],
    migrationsTableName: 'nestjs_migrations',
    synchronize: false,
});