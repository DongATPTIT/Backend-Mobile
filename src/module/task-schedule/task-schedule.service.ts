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

    @Cron('0 * * * * *')
    // @Cron('*/15 * * * * *')

    async pushNotifications() {
        const apoiments = await this.apoimentService.getApoiment();
        console.log("a", apoiments);
        let payload = {
            token: "",
            notification: {
                title: "Hi there this is title",
                body: "Hi there this is message"
            },
            data: {
                name: "",
                age: "21"
            }
        }
        apoiments.forEach((apoiment) => {
            payload.data.name = apoiment.user.name;
            payload.token = apoiment.user.deviceToken
            return this.fcmNotificationService.sendNotification(payload)
        })
    }
}