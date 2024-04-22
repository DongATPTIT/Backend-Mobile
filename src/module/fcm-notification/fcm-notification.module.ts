import { Module } from "@nestjs/common";
import { FcmNotificationService } from "./fcm-notification.service";

@Module({
    providers: [FcmNotificationService]
})
export class FcmNotificationModule { }