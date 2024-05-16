import { Body, Controller, Param, Post } from "@nestjs/common";
import { FcmNotificationService } from "./fcm-notification.service";
import { UserService } from "../user/user.service";


@Controller('fcm')
export class FcmNotificationController {
    constructor(
        private readonly fcmNotificationService: FcmNotificationService,
    ) { }

    @Post('/send-notification/:id')
    async sendNotification(@Param('id') id, @Body() payload) {
        try {
            console.log(payload)
            return this.fcmNotificationService.sendNotification(payload);
        }
        catch (error) {
            console.log(error);
        }

    }
}