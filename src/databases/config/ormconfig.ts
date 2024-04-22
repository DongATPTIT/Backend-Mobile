import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config();
const configService = new ConfigService();
export default new DataSource(
    {
        type: 'mysql',
        host: configService.get('HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('USER_NAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ["src/databases/entity/*.js"],
        migrationsRun: false,
        migrations: [
            "src/migrations/*.ts",
            "dist/migrations/*{.ts,.js}"
        ],
        // cli: {
        //     entitiesDir: __dirname + '/src/databases/entities',
        //     migrationsDir: "src/migrations",
        // },
        // autoLoadEntities: true,
        // synchronize: true
    }
);