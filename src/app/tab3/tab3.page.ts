import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterPage } from '../filter/filter.page';
import { DonorFilterPage } from '../pages/donor-filter/donor-filter.page';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  public userData: any = { incoming_key: '', outgoing_key: '' };
  public chip: any = [];
  filterTerm!: string;
  public activitys: any;
  public search: any;
  public blood_group: any = [
    { type: 'A+' },
    { type: 'B+' },
    { type: 'AB+' },
    { type: 'O+' },
    { type: 'O-' },
    { type: 'AB-' },
    { type: 'B-' },
    { type: 'A-' },
  ];
  public allFilterData;
  uid: any;
  public clearFilter: boolean = true;
  constructor(
    public apiCall: ApicallService,
    private router: Router,
    public global: GlobalService,
    public modalCtrl: ModalController
  ) {}
  async ionViewDidEnter() {
    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Dark });
    this.getProfile();
  }
  async ngOnInit() {
    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Dark });
    this.getProfile();
  }
  // Get Profile
  async getProfile() {
    await this.global.Uid.subscribe((uid) => {
      this.uid = uid;
      this.getFilteredData();
    });
  }
  // get Filtered Data
  async getFilteredData() {
    this.clearFilter = true;
    this.apiCall.api_getFilter({
      u_id: this.uid,
      city: 'Pakpattan',
      blood: 'B+',
      type: 'donor',
      condition: 'all',
    });
    this.global.GetFilter.subscribe((filter) => {
      this.allFilterData = filter;
    });
  }
  // Requests Details
  async openModal(request: any) {
    const modal = await this.modalCtrl.create({
      component: DonorFilterPage,
      mode: 'ios',
      componentProps: {
        Request: request,
      },
      initialBreakpoint: 0.9,
      cssClass: 'See-Requests-Modal',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
    console.log(data);
    if (data.type === 'blood') {
      this.clearFilter = false;
      this.apiCall.api_getFilter({
        u_id: this.uid,
        city: 'Pakpattan',
        blood: data.blood,
        type: 'donor',
        condition: data.type,
      });
      this.global.GetFilter.subscribe((filter) => {
        this.allFilterData = filter;
      });
    }
    if (data.type === 'city') {
      this.clearFilter = false;
      this.apiCall.api_getFilter({
        u_id: this.uid,
        city: data.city,
        blood: '',
        type: 'donor',
        condition: data.type,
      });
      this.global.GetFilter.subscribe((filter) => {
        this.allFilterData = filter;
      });
    }
    if (data.condition === 'type') {
      this.clearFilter = false;
      this.apiCall.api_getFilter({
        u_id: this.uid,
        city: '',
        blood: '',
        type: data.typeFilter,
        condition: data.condition,
      });
      this.global.GetFilter.subscribe((filter) => {
        this.allFilterData = filter;
      });
    }
  }
  //show_chat
  async show_chat(user) {
    console.log(user);
    console.log(this.userData);
    this.userData.reciever_id = user.u_id;
    await this.apiCall.api_getChat(this.userData);
    this.global.set_chat(user);
    const x = { data: user.u_id, userData: user };
    this.router.navigate(['chat'], { state: { data: user } });
  }
}
