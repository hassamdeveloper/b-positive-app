import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { UserprofilePage } from '../userprofile/userprofile.page';
import { interval, Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage
  implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked
{
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  public messages: any = [];

  currentUser = 'Rehan';

  public newMsg: any = { incoming_key: '', outgoing_key: '', msg: '' };
  public other: any = '';
  public chat: any;
  public userData: any = { name: '', p_img: '' };
  public keys: any = { incoming_key: '', outgoing_key: '' };
  counter = interval(60000); // sets 60 seconds interval
  public userID: any;
  public subscription: Subscription;
  @ViewChild(IonContent) content: IonContent;

  constructor(
    public route: Router,
    public global: GlobalService,
    private apiCall: ApicallService,
    public modalController: ModalController
  ) {}

  ionViewDidEnter() {
    const source = interval(3000);
    this.subscription = source.subscribe((val) => this.getChat());
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }
  async ngOnInit() {
    // this.sendMessage();
    this.chat = history.state.data;
    console.log(this.chat);

    this.userData.p_img = this.chat.p_img;
    this.userData.name = this.chat.name;
    this.keys.incoming_key = this.chat.u_id;
    this.newMsg.incoming_key = this.chat.u_id;
    this.userID = this.chat.u_id;
    let x;
    await Preferences.get({ key: 'getUser' }).then((result) => {
      x = result.value;
      this.global.add_uid(x);
      //console.log(x);
    });
    this.global.Uid.subscribe((u_id: any) => {
      console.log(
        '🚀 ~ file: chat.page.ts:65 ~ this.global.Uid.subscribe ~ u_id:',
        u_id
      );

      this.other = u_id;
      this.keys.outgoing_key = u_id;
      this.newMsg.outgoing_key = u_id;
    });
    this.getChat();
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
    this.scrollToBottom();
  }
  ngAfterViewChecked() {
    // this.getChat();
    // this.scrollToBottom();
  }

  scrollToBottom(): void {
    console.log('true');

    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
    this.getChat();
  }

  async getChat() {
    console.log(this.keys);

    await this.apiCall.api_getChat(this.keys);
    await this.global.Chat.subscribe((res) => {
      this.messages = res;
      console.log(
        '🚀 ~ file: chat.page.ts:107 ~ awaitthis.global.Chat.subscribe ~ messages:',
        this.messages
      );

      // this.chat = res;
      console.log(this.chat);
    });
  }
  async sendMessage() {
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
    await this.apiCall.api_postChat(this.newMsg);
    this.getChat();
    this.newMsg.msg = '';
  }

  async openProfile() {
    console.log(this.userID);
    const modal = await this.modalController.create({
      component: UserprofilePage,
      cssClass: 'my-modal-class',
      componentProps: {
        userId: this.userID,
      },
    });
    return await modal.present();
  }
  go_back() {
    this.route.navigate(['/tabs/tab4']);
  }

  ngOnDestroy() {
    console.log('Destroy');
    this.getChat();
    this.subscription.unsubscribe();
  }
  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }
}
