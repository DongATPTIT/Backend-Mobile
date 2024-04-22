import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './databases/entity/user.entity';
import { Group } from './databases/entity/group.entity';
import { Prescuption } from './databases/entity/prescuption.entity';
import { Health } from './databases/entity/health.entity';
import { Booking } from './databases/entity/booking.entity';
import { Medicine } from './databases/entity/medicine.entity';
import { Schedule } from './databases/entity/schedule.entity';
import { TakeMedicine } from './databases/entity/take_medicine.entity';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guards/auth.guard';
import { AllExceptionsFilter } from './common/exceptions/all.exceptions';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQLDB_HOST'),
        port: configService.get('MYSQLDB_DOCKER_PORT'),
        username: configService.get('MYSQLDB_USER'),
        password: configService.get('MYSQLDB_PASSWORD'),
        database: configService.get('MYSQLDB_DATABASE'),
        entities: ["src/databases/entity/*.js"],
        migrationsRun: false,
        migrations: [
          "src/migrations/*.ts",
          "dist/migrations/*{.ts,.js}"
        ],
        cli: {
          entitiesDir: __dirname + '/src/databases/entities',
          migrationsDir: "src/migrations",
        },
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    TypeOrmModule.forFeature([User, Group, Prescuption, Health, Booking, Medicine, Schedule, TakeMedicine]),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule { }
