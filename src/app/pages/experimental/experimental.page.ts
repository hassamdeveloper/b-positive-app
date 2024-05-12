import { GlobalService } from 'src/app/Services/global.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatService } from 'src/app/Services/chat.service';
import { Observable } from 'rxjs';
export interface Message {
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: number;
}
@Component({
  selector: 'app-experimental',
  templateUrl: './experimental.page.html',
  styleUrls: ['./experimental.page.scss'],
})
export class ExperimentalPage {
  message = {
    to: 'fatlJCv8Q-KaITaA8dA6Ba:APA91bEkSZJAps-lLcpQPZXCESEwib9kG1VMYZAfh02hp3x0sbeHi3omuQ5uCiwrxk8awY4xLdvkJJwqgvf-YOvfZLgN9wzamgK3J0U82v_tmUBpF_8OKbDrEmCzP1UQuIKZoNA-emW7',
    notification: {
      title: '<notification title>',
      body: '<notification body>',
    },
    data: {
      my_key: 'my value',
      my_another_key: 'my another value',
    },
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAA1KQM2qM:APA91bHbv_pjLIWxcxd0biaxCvy5qWZCBmerEVcseP3VS2kaZZ5UO6nrU6xCT11uVpj5fmT5cn5TwvQ347_gwvPewb6nkBMasAOBj_UUmcSNDrclMjoaerxVVK2MhNkaPsCCnFasLnPE',
    }),
  };
  response = '';
  messages$: Observable<Message[]>;
  chat: string;
  constructor(
    private http: HttpClient,
    private chatService: ChatService,
    private global: GlobalService
  ) {
    this.chatService.get("userId1","userId2");
    this.chatService.getMessages('userId1', 'userId2');
    this.chatService.getChatPartners('userId1').then((chatPartners) => {
      console.log(
        '🚀 ~ file: experimental.page.ts:46 ~ ExperimentalPage ~ sendMessage ~ chatPartners:',
        chatPartners
      );
    });

    this.messages$ = this.global.FireChat;
    this.messages$.subscribe((messages: any[]) => {
      const userId = "zagham"; // replace with your own user ID
const headers = [];

if(messages.length > 0) {
  messages.forEach(message => {
    const id = message.senderId === userId && message.receiverId ? message.receiverId : message.senderId;
    const header = headers.find(header => header.id === id);
  
    if (!header) {
      headers.push({ id, name: message.senderId === userId ? "receiver" : "sender" });
    }
  });
}

console.log(headers);
    });
  }

  sendNotification() {
    console.log('s');

    this.http
      .post(
        'https://fcm.googleapis.com/fcm/send',
        this.message,
        this.httpOptions
      )
      .subscribe(
        (response) => {
          this.response =
            'FCM message sent successfully: ' + JSON.stringify(response);
        },
        (error) => {
          this.response = 'Error sending FCM message: ' + JSON.stringify(error);
        }
      );
  }

  sendMessage($event: any): void {
    console.log(
      '🚀 ~ file: experimental.page.ts:46 ~ ExperimentalPage ~ sendMessage ~ message:',
      this.chat
    );
    const userId = 'zagham';
    this.chatService.sendMessage(userId, 'userId1', this.chat);
    console.log(
      '🚀 ~ file: experimental.page.ts:64 ~ ExperimentalPage ~ sendMessage ~ chat:',
      this.chat
    );
    this.chat = '';
    this.chatService.get("userId1","userId2");
    this.constructor()
  }
}
