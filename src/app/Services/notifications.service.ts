import { Injectable } from '@angular/core';
import * as OneSignal from '@onesignal/node-onesignal'
const REST_API_KEY = 'MDY5MjM3NGYtYzBmMy00ZDQzLThkYmYtMTNmNzQ3NzcxMzg2';
const APP_ID = '16211a51-89c1-4ba3-9c20-35525c9f0b28';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
constructor() { }
  async sendNotification(title:any, description:any) {
    console.log(title, description)
    const app_key_provider = {
      getToken() {
        return REST_API_KEY;
      }
    };
    const configuration = OneSignal.createConfiguration({
      authMethods: {
        app_key: {
          tokenProvider: app_key_provider
        }
      }
    });
    const client = new OneSignal.DefaultApi(configuration);
    const notification = new OneSignal.Notification();
    notification.app_id = APP_ID;
    notification.included_segments = ['Subscribed Users'];
    notification.contents = {
      en: description
    };
    notification.headings = {
      en: title
    };
    notification.large_icon = 'https://ibb.co/1bW8YvS'
    const {id} = await client.createNotification(notification);
  }
}
