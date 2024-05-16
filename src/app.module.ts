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
import { FcmNotificationModule } from './module/fcm-notification/fcm-notification.module';
import { Apoiment } from './databases/entity/apoiment.entity';
import { ApoimentModule } from './module/apoiment/apoiment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { taskScheduleService } from './module/task-schedule/task-schedule.service';
import { ApoimentService } from './module/apoiment/apoiment.service';
import { FcmNotificationService } from './module/fcm-notification/fcm-notification.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
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
    TypeOrmModule.forFeature([User, Group, Prescuption, Health, Booking, Medicine, Schedule, TakeMedicine, Apoiment]),
    AuthModule,
    UserModule,
    FcmNotificationModule,
    ApoimentModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    taskScheduleService,
    ApoimentService,
    FcmNotificationService
  ],
})
export class AppModule { }
