import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ApoimentService } from "../apoiment/apoiment.service";
import { FcmNotificationService } from "../fcm-notification/fcm-notification.service";
@Injectable()
export class taskScheduleService {
    constructor(
        private readonly apoimentService: ApoimentService,
        private readonly fcmNotificationService: FcmNotificationService
    ) { }

    // @Cron('0 * * * * *')
    // @Cron('*/15 * * * * *')

    async pushNotifications() {
        const apoiments = await this.apoimentService.getApoimentAtCurrentTime();
        let payload = {
            token: "",
            notification: {
                title: "Hello, your appointment time has come",
            },
            data: {
                name: ""
            }

        }
        apoiments.forEach((apoiment) => {
            payload.data.name = apoiment.deviceSession.user.name;
            payload.token = apoiment.deviceSession.deviceToken;
            return this.fcmNotificationService.sendNotification(payload)
        })
    }
}