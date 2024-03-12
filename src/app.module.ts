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

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('USER_NAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ["src/databases/entity/*.js"],
        autoLoadEntities: true,
        synchronize: true
      })
    }),
    TypeOrmModule.forFeature([User, Group, Prescuption, Health, Booking, Medicine, Schedule, TakeMedicine]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
