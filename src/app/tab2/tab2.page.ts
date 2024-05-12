import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SeeRequestsComponent } from '../components/see-requests/see-requests.component';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  selectTabs: any = 'all';

  // activities_you_created
  public activities_you_created: any = [];
  public myparticipation: any;
  public myGoing: any;
  public MaybeGoing: any;

  count_M: number;
  count_G: number;
  // public CreatedActivity:any={u_id:'',activity_name:'',location:'',description:'',max_atendes:'',social_range:'',date:'',start_time:'',end_time:'',a_image:'',profile_img:''}
  public YourActivity: any = { u_id: '' };
  uid: string;
  allRequests: any;
  totalRequests: any = 0;
  totalMyRequests: any = 0;
  totalMyCampaigns: any = 0;
  donors: any;
  allMyRequests: any;
  public u_id: any;
  totalCountMyRequests: any;
  my_campaigns: any;
  constructor(
    public route: Router,
    public apiCall: ApicallService,
    private router: Router,
    public global: GlobalService,
    public modalCtrl: ModalController
  ) { }

  async ionViewDidEnter() {
    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Dark });
    this.getAllRequests();
  }
  async ngOnInit() {
    this.getAllRequests();
    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Dark });
  }

  // GetActivity method

  async getactivity() {
    await this.global.Uid.subscribe((uid) => {
      this.YourActivity.u_id = uid;
    });
    await this.apiCall.api_getActivity(this.YourActivity.u_id);
    await this.global.Getactivity.subscribe((activity) => {
      this.activities_you_created = activity;
    });
    console.log(this.activities_you_created);
    this.getmyallparticipant();
  }

  async getmyallparticipant() {
    await this.apiCall.api_myparticipantActivity(this.YourActivity.u_id);
    await this.global.Myparticipant.subscribe((res) => {
      this.myparticipation = res;
      console.log(this.myparticipation);
      this.count_G = this.myparticipation.filter(
        (x) => x.status === 'g'
      ).length;
      console.log(this.count_G);
      this.myGoing = this.myparticipation.filter((x) => x.status === 'g');
      console.log(this.myGoing);
      this.count_M = this.myparticipation.filter(
        (x) => x.status === 'm'
      ).length;
      console.log(this.count_M);
      this.MaybeGoing = this.myparticipation.filter((x) => x.status === 'm');
      console.log(this.MaybeGoing);
    });
  }

  // show activity details
  editActivty(data) {
    console.log(data);
    this.router.navigate(['/create-activity'], { state: { data: data } });
  }

  activitydetails(data) {
    console.log(data);
    this.router.navigate(['/myactivity'], { state: { data: data } });
  }

  mypaticipatactivitydetails(data) {
    console.log(data);
    this.router.navigate(['/activity-details'], { state: { data: data } });
  }

  async checkStatus(a_id) {
    console.log(a_id);
    await this.apiCall.api_ActivityStatus(a_id);
    this.route.navigate(['/tabs/canidates']);
  }

  gotosearh() {
    this.route.navigate(['tabs/tab3']);
    this.getactivity();
    this.getmyallparticipant();
    this.getDataactivity();
  }

  async getDataactivity() {
    await this.apiCall.api_getallActivitybylocation();
    await this.apiCall.api_getallfilterActivity();
    //  await this.apiCall.api_getpeopleForChat();
  }
  async getAllRequests() {
    this.global.Uid.subscribe((uid) => {
      this.u_id = uid;
      this.apiCall.api_getDailyRequests(uid);
      this.global.Requests.subscribe((res) => {
        this.allRequests = res;
        console.log('all requests' + res);
      });
      this.apiCall.api_getCountRequests(uid);
      this.global.RequestsCount.subscribe((count) => {
        this.totalRequests = count.total_requests;
        console.log('total requests' + count);
      });
      this.apiCall.api_getDailyDonors();
      this.global.Donors.subscribe((donor) => {
        this.donors = donor;
        console.log('donors', donor);
      });
      this.apiCall.api_getMyCountRequests(uid);
      this.global.MyRequestsCount.subscribe((my_requests) => {
        this.totalCountMyRequests = my_requests.my_total_requests;
        console.log('my requests for blood', my_requests);
      });
      this.apiCall.api_getMyCountCompaings(uid);
      this.global.MyCampaignsCount.subscribe((my_campaigns) => {
        this.totalMyCampaigns = my_campaigns.total_my_campaigns;
        console.log('my campaigns', my_campaigns);
      });
      this.apiCall.api_getMyDailyRequests(uid);
      this.global.MyRequests.subscribe((my_requests) => {
        this.totalMyRequests = my_requests;
        console.log('my requests', my_requests);
      });
      this.apiCall.api_getMyDailyCampaigns(uid);
      this.global.MyCampaigns.subscribe((my_campaigns) => {
        this.my_campaigns = my_campaigns;
        console.log('my campaigns', my_campaigns);
      });
    });
  }
  // Requests Details
  async openModal(request: any) {
    const modal = await this.modalCtrl.create({
      component: SeeRequestsComponent,
      componentProps: {
        Request: request,
      },
      initialBreakpoint: 0.65,
      cssClass: 'See-Requests-Modal',
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }
}
