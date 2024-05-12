import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  public Allusers: any;
  public userData: any = { incoming_key: '', outgoing_key: '' };
  public u_id: any;
  constructor(
    public route: Router,
    public global: GlobalService,
    public apicall: ApicallService
  ) {}

  async ngOnInit() {
    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Dark });

    let x = await Preferences.get({ key: 'getUser' });
    this.global.add_uid(x);
    this.global.Uid.subscribe((uid) => {
      this.userData.sender_id = uid;
      this.u_id = uid;
      console.log(uid);
      this.getAllPeopleForChat();
    });
  }
  async ionViewDidEnter() {
    this.getAllPeopleForChat();

    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Dark });
    let x;
    await Preferences.get({ key: 'getUser' }).then((result) => {
      x = result.value;
      this.global.add_uid(x);
      //console.log(x);
    });
    this.global.Uid.subscribe((uid) => {
      this.userData.sender_id = uid;
      this.u_id = uid;
      console.log(uid);
      this.getAllPeopleForChat();
    });
  }
  async getAllPeopleForChat() {
    console.log(this.u_id);
    await this.apicall.api_getUsersForChat({ outgoing_key: this.u_id });
    this.global.StorpeopleForchat.subscribe((res) => {
      this.Allusers = res;
      console.log(res);
    });
  }

  //show_chat
  async show_chat(user) {
    console.log(user);
    console.log(this.userData);
    this.userData.reciever_id = user.u_id;
    await this.apicall.api_getChat(this.userData);
    this.global.set_chat(user);
    const x = { data: user.u_id, userData: user };
    this.route.navigate(['chat'], { state: { data: user } });
  }

  // navigate back
  go_home() {
    this.route.navigate(['/tabs/tab1']);
  }
  async getChatHeads(u_id: any) {
    await this.apicall.api_getAllChatHeads(u_id);
    this.global.ChatHeads.subscribe((heads) => {
      console.log(heads);
      this.Allusers = heads;
    });
  }
  ionViewDidLeave() {
    this.global.Uid.subscribe((uid) => {
      this.userData.sender_id = uid;
      this.u_id = uid;
      console.log(uid);
      this.getChatHeads(uid);
    });
  }
}
