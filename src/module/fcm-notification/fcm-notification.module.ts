import { Module } from "@nestjs/common";
import { FcmNotificationService } from "./fcm-notification.service";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/databases/entity/user.entity";
import { FcmNotificationController } from "./fcm-notification.controller";
@Module({
    imports: [
        ScheduleModule.forRoot(),
        TypeOrmModule.forFeature([User]),

    ],
    controllers: [FcmNotificationController],
    providers: [FcmNotificationService]
})
export class FcmNotificationModule { }