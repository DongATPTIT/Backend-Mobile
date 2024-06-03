import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'mysql',
    host: process.env.MYSQLDB_HOST,
    port: process.env.MYSQLDB_DOCKER_PORT,
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    entities: ["dist/src/databases/entity/*.js"],
    migrationsRun: false,
    migrations: [
        "src/migrations/*.ts",
        "dist/migrations/*{.ts,.js}"
    ],

    cli: {
        entitiesDir: __dirname + '/src/databases/entity',
        migrationsDir: "src/migrations",
    },
    autoLoadEntities: true,
    synchronize: true,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);