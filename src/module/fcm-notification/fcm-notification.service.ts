import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert({
        // projectId: PROJECT-ID,  // replace with your app project-ID
        // clientEmail: CLIENT-KEY, //replace with your app CLIENT-KEY
        // privateKey: PRIVATE-KEy //replace with your app PRIVATE-KEy
    }),
});
@Injectable()
export class FcmNotificationService {
    constructor() {
    }
}
