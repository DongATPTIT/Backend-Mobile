import { Body, Controller, Param, Post } from "@nestjs/common";
import { FcmNotificationService } from "./fcm-notification.service";
import { UserService } from "../user/user.service";


@Controller('fcm')
export class FcmNotificationController {
    constructor(
        private readonly fcmNotificationService: FcmNotificationService,
    ) { }

    @Post('/send-notification')
    async sendNotification(@Body() payload) {
        try {
            return this.fcmNotificationService.sendNotification(payload);
        }
        catch (error) {
            console.log(error);
        }

    }
}