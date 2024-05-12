import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ApicallService } from 'src/app/Services/apicall.service';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-see-donors',
  templateUrl: './see-donors.page.html',
  styleUrls: ['./see-donors.page.scss'],
})
export class SeeDonorsPage implements OnInit {
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
  search: any;
  uid: any;
  userlocation: any;
  user: any;
  Profile: any;
  public donors: any;
  constructor(public apiCall: ApicallService, public global: GlobalService) { }

  ionViewDidEnter() {
    this.getProfile();
    this.search = history.state.data;
  }
  ngOnInit() {
    this.getProfile();
    this.search = history.state.data;
  }
  async getProfile() {
    const result: any = await Preferences.get({ key: 'getUser' });
    this.global.add_uid(result.value);
    await this.global.Uid.subscribe((uid) => {
      console.log(
        '🚀 ~ file: see-donors.page.ts:39 ~ SeeDonorsPage ~ awaitthis.global.Uid.subscribe ~ uid:',
        uid
      );
      this.uid = uid;

      this.userlocation.u_id = uid;
    });

    await this.apiCall.api_getprofile(this.uid);
    console.log(this.uid);
    await this.global.ProfileInfo.subscribe((res) => {
      this.user.name = res[0].name;
      this.user.image = res[0].img;
      console.log(res[0].img);
      this.Profile = res[0];
    });
    await this.apiCall.api_getDailyDonors();
    this.global.Donors.subscribe((donor) => {
      this.donors = donor;
    });
  }
  // Filter By Blood Type
  filterByBloodType(group: any) {
    this.search = group.type;
  }
}
