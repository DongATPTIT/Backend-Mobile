import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: "mecidine-app",
        clientEmail: "firebase-adminsdk-8aida@mecidine-app.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCt5aRjPPSUz2PG\n/jlxEMVHVF81WiEVq0+Qk2HFq5LJkhuRF1j/KIxsJQr8AD0edXFo8JqlkmhJBglR\nm0UmO7VJlK8wqPtj6JF5zoarr1qevGHWwU6eDOJIVJ62dWgY8KNyTKATq+fTb81p\nUnf41bDYMWn+DPcv1cuoqVTJqIDW8ce5vvAkEi0Smjplq7AszTWX0Zwwg20065qA\nKRn6ezN+taUQEKs/BeaxQCxjradHHLYfQlAZgum5gUCdI7vtt23P+uW3IkWlqk4D\n2ir8LP7HJXRpnxNARX7gYQndGUaWv+8zbvPAfpa9TPBoNRbc8UBVMAZguHU77RQi\nFtxgZyHHAgMBAAECggEAQ3c+qcmyUjGL0l47RuRsxVm0fmxzPYbzHXIwkpIYJt/q\nlgXq30OKB0Lv2gj1rWV/FGmUdfwxPXN8Fg8ZatXrZZqrxUMqFP7bwdggY2dqzv7j\nLoBc0fDJsaoy0TMHqfViVCvqRveAv4U2uk/mf8HYFGhHaOr607Isi0j2vi4DnmAX\nAfIovtTZANDvRRRFGPBNS8oRCHGe2oNLkoNK2qLXdQIdUGxx0pnqzN82doXs/5BW\nhyeu0KXLrIvxXWFzfdc2WuXp43b6qn5TADDqtniB64GLZBJdjz9C4dP9Qy1BglNd\nyyt57Ynz8VynVcSGCrQCNIwCJxaV8UtMXVcwx5TD4QKBgQDlj5K/Kzu+D5BbHK4p\nY+xgOpVsLqtSgkjRdGs/hryJL9MSjVdUVOYqIQpnYXDtNcbiEbGdPAKtx03SZzhs\no8Y3N19a1eaa9ksbuYFIsjxvG1UD6NDNVzTlOfQDWlAuYgKpO2u3yOJWGsRrSR2b\ns8qe5manoz1SfRSaakR6gUaUTwKBgQDB7N0/cMG8DxS+yLkeqjdCLtN3sHbpI75A\nTF9MBlggnR7/8vgk2ADfbrPApEZRGW/dR+ElUeLH363Ic2OJxf+WyfCxgjLOIZks\n8u8TY4BQe0UF3LZ+wrxyaZqQZXstmHfrtb/isLWroQRaz0VGNWTDif1GoBLgdMUL\n/F9HXRulCQKBgQDhKjRMIoHU6Ls1QyppGsPNl2jc1eHhaj02hTR0+RmQjkJAXjac\nVzHzfLkRsffsE+Vh9Oz8RtJx1Z21lN05YmKX4k47cLdio9YD+a6fuYOhj3OSBBha\ncQFHHdMEPt+Kv0PQ7qG3gOjQgCzM9sh94poJxgBGyczqThmZZEaKyqaJ7QKBgQCB\nZRvnpcQPSHzOJD6pQGhop7gAZ+WgAHKEkrEPmDgbYtt5atS6OMq0SzhzdOlaWb+z\nha+r6CyKsyxQ0PV8y3mUUqBgwQBHXFHJlTuC02SdzvKqS7AVerilGuPAL4Z2UQLL\na1Vi3AgMQf8W3LBbfWsDskImas7Np/yG19l3U6ALiQKBgQDcoOJNZ+PO1D8/LXgF\nrsoLVSl97M6sRFZI5lXSHunv/Wdmlk0RegLrC/uVFCFtxQ+1Yzn/HrUPL76GI0b3\nRCuRxyVlRbsJ8pyU6xKUN38yGG14reh6nKrkWR6cjKA6ILLIZfH1zZrrofrgfaLR\nTrVxmvdeSYG0xqlmzfrtNIitpw==\n-----END PRIVATE KEY-----\n",
    }),
});
@Injectable()
export class FcmNotificationService {

    async sendNotification(payload) {
        try {
            return admin.messaging().send(payload)
        }
        catch (error) {
            throw new Error(error)
        }
    }
}
