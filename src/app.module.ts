import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './databases/entity/user.entity';
import { HealthUser } from './databases/entity/health-user.entity';
import { Medicine } from './databases/entity/medicine.entity';
import { ScheduleMedicine } from './databases/entity/schedule-medicine.entity';
import { TakeMedicine } from './databases/entity/take_medicine.entity';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { FcmNotificationModule } from './module/fcm-notification/fcm-notification.module';
import { Apoiment } from './databases/entity/apoiment.entity';
import { ApoimentModule } from './module/apoiment/apoiment.module';
import { ScheduleModule } from '@nestjs/schedule';
import { taskScheduleService } from './module/task-schedule/task-schedule.service';
import { ApoimentService } from './module/apoiment/apoiment.service';
import { FcmNotificationService } from './module/fcm-notification/fcm-notification.service';
import { DeviceSession } from './databases/entity/device-session.entity';
import { RolesGuard } from './common/guards/role.guard';
import typeorm from './config/typeorm';
import { AuthGuard } from './common/guards/authen.guard';
import { GroupUser } from './databases/entity/group-user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        load: [typeorm]
      }
    ),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TypeOrmModule.forFeature(
      [User, GroupUser, HealthUser, Medicine, ScheduleMedicine, TakeMedicine, Apoiment, DeviceSession]
    ),
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
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
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
