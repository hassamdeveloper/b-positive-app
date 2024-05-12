import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications'
@Injectable({
  providedIn: 'root'
})
export class LocalNotificationService {

  public constructor() { }
  public async scheduleNotification(title: string, body: string): Promise<void> {
    // generate random number
    const random = Math.floor(Math.random() * 1000);
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: random, // Unique identifier for the notification
          // schedule: { at: new Date(Date.now() + 1000) }, // Display it 1 second from now
        },
      ],
    });
  }
}
