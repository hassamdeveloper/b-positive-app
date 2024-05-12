import { Injectable } from '@angular/core';
import { AuthService, apiUrl } from './auth.service';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { NotificationsService } from './notifications.service';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApicallService {
  login: any;
  activity: any;
  data: any;

  goingStatus: any = 'are  going';
  maygoingStatus: any = 'may be going';
  alreadygoingStatus: any = 'are already going';
  alreadymaygoingStatus: any = 'already may go';
  cities: any;
  request: any;
  requestCount: any;
  donor: any;
  requestMyCount: any;
  campaignMyCount: any;
  getMyRequests: any;
  getAddress: any;
  getMyCampaigns: any;
  chatHeads: any;
  getFilter: any;

  constructor(
    public global: GlobalService,
    public router: Router,
    public authservice: AuthService,
    public http: HttpClient,
    public toast: ToastService,
    public notification: NotificationsService
  ) { }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  //Login
  api_addLogin(login: any) {
    this.authservice.con(login, 'login').then(
      async (res) => {
        this.login = JSON.parse(String(res).toString());
        // this.global.set_login(this.login);
        if (this.login.error === false) {
          console.log(this.login);

          return;
        } else {
          console.log(this.login);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //create activity
  api_addActivity(data: any) {
    this.authservice.con(data, 'insert_activity').then(
      async (res) => {
        this.data = JSON.parse(String(res).toString());
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //Get Method
  getActivities() {
    return this.authservice.getdata('getappointment').then(
      (result) => {
        this.activity = JSON.parse(String(result));
        // this.global.set_activity(this.activity);
        console.log(this.activity, 'data Updated');
        return result;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  }
  //Get All Cities
  getAllCities() {
    return this.authservice.getdata('getAllCities').then(
      (result) => {
        this.cities = JSON.parse(String(result));
        this.global.set_cities(this.cities);
        console.log(this.cities, 'data Updated');
        return result;
      },
      (err) => {
        console.log(err);
        return err;
      }
    );
  }

  // profile api

  async api_postProfile(data: any) {
    await this.authservice.con(data, 'create_profile').then(
      async (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          await Preferences.set({
            key: 'profile',
            value: JSON.stringify(data),
          });
          this.router.navigate(['/tabs/tab1']);
          this.toast.profilecreateToast();
          console.log(this.data);
          await Preferences.set({
            key: 'profile',
            value: JSON.stringify(data),
          });
          await Preferences.set({
            key: 'getUser',
            value: `${data.u_id}`,
          });
          const x = await Preferences.get({ key: 'getUser' });
          console.log(x);
          return;
        } else {
          console.log(this.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async api_getprofile(u_id: any) {
    await this.authservice.getdata('getprofile/' + u_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_profileInfo(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async api_updateprofile(data: any) {
    await this.authservice.con(data, 'update_profile').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // google login
  async api_postLogin(data: any) {
    await this.authservice.con(data, 'login').then(
      async (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          this.router.navigate(['/tabs/tab1']);
          this.toast.loginToast();
          console.log(data);
          await Preferences.set({
            key: 'getUser',
            value: `${data.u_id}`,
          });
          const x = await Preferences.get({ key: 'getUser' });
          console.log(x);
          return;
        } else this.data.error === true;
        this.router.navigate(['new-user']);
        this.toast.newUserloginToast();
        console.log(this.data);
        await Preferences.set({
          key: 'getUser',
          value: `${data.u_id}`,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // Update TOken
  async api_updateToken(data: any) {
    await this.authservice.con(data, 'updateToken').then(
      async (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
        } else this.data.error === true;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //  get activity by id
  async api_getActivity(u_id: any) {
    await this.authservice.getdata('getactivitybyid/' + u_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_getActivity(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get all public activity for filter
  async api_getallfilterActivity() {
    await this.authservice.getdata('getactivitybylocation').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_allfilteractivity(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get my activity activity
  async api_myparticipantActivity(u_id: any) {
    await this.authservice.getdata('myparticipantactivity/' + u_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_myparticipant(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //  get activity status
  async api_ActivityStatus(a_id: any) {
    await this.authservice.getdata('getstatus_activity/' + a_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_getActivityStatus(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // post activity
  async api_postActivity(data: any) {
    await this.authservice.con(data, 'insert_activity').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          this.toast.createActiviyToast();
          this.router.navigate(['tabs/tab2']);
          return;
        } else {
          console.log(this.data);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // update activity
  async api_updateActivity(data: any) {
    await this.authservice.con(data, 'updateactivity').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // post status
  async api_postStatus(data: any) {
    await this.authservice.con(data, 'create_status').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          console.log(data);
          if (data.status == 'g') {
            this.toast.alreadygoingActiviyToast(this.alreadygoingStatus);
          } else {
            this.toast.alreadygoingActiviyToast(this.alreadymaygoingStatus);
          }
          return;
        } else {
          console.log(this.data);
          console.log(data);
          if (data.status == 'g') {
            this.toast.goingActiviyToast(this.goingStatus);
            this.router.navigate(['tabs/tab2']);
          } else {
            this.toast.goingActiviyToast(this.maygoingStatus);
            this.router.navigate(['tabs/tab2']);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // post status
  async api_getStatus(data: any) {
    await this.authservice.con(data, 'update_status').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  api_getpeopleForChat() { }
  //  get people  for Chat
  async api_getUsersForChat(data: any) {
    await this.authservice.con(data, 'getAllUsers').then((result) => {
      this.data = JSON.parse(String(result));
      console.log(
        '🚀 ~ file: apicall.service.ts:348 ~ ApicallService ~ awaitthis.authservice.con ~ data:',
        data
      );

      this.global.set_storpeopleForchat(this.data.users);
    });
  }

  // post status
  async api_postChat(data: any) {
    await this.authservice.con(data, 'insertChat').then(
      (result) => {
        this.data = JSON.parse(String(result));
        if (this.data.error === false) {
          console.log(this.data);
          return;
        }
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // get chat
  async api_getChat(data: any) {
    this.authservice.con(data, 'getChat').then(
      async (res) => {
        this.data = JSON.parse(String(res).toString());
        this.global.set_chat(this.data.message);
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
    return this.data.message;
  }

  //  get one week activity
  async api_getoneWeekactivity() {
    await this.authservice.getdata('getOneWeekActivity').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_allfilteractivity(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get current date activity
  async api_getcurrentDateactivity() {
    await this.authservice.getdata('getcurrentDateActivity').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_allfilteractivity(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get activity Social Range
  async api_getactivitySocialRange(social_range: any) {
    await this.authservice
      .getdata('getActivityonSocialRange/' + social_range)
      .then(
        (result) => {
          this.data = JSON.parse(String(result));
          console.log(this.data);
          this.global.set_allfilteractivity(this.data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  //  get activity by manual date
  async api_getactivitybymanualDate(data: any) {
    await this.authservice.con(data, 'getActivitybymanualDate').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_allfilteractivity(this.data);
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //  get all public activity
  async api_getallActivitybylocation() {
    await this.authservice.getdata('getactivitybylocation').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_storallactivity(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //  post location
  async api_postLocation(data: any) {
    // console.log(
    //   '🚀 ~ file: apicall.service.ts:461 ~ ApicallService ~ api_postLocation ~ data:',
    //   data
    // );

    // await this.authservice.con(data, 'addUserlocation').then(
    //   (result) => {
    //     this.data = JSON.parse(String(result));
    //     console.log(this.data);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
  // update user location 
  public async updateUserLocation(data: any) {
    await this.authservice.con(data, 'addUserlocation').then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get user profile
  async api_getuserprofile(u_id: any) {
    await this.authservice.getdata('getprofile/' + u_id).then(
      (result) => {
        this.data = JSON.parse(String(result));
        console.log(this.data);
        this.global.set_getuserprofile(this.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get all by id
  async api_getDailyRequests(u_id: any) {
    await this.authservice.getdata('getDailyRequests/' + u_id).then(
      (result) => {
        this.request = JSON.parse(String(result));
        console.log(this.request);
        this.global.set_getDailyRequests(this.request);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get all by id
  async api_getMyDailyRequests(u_id: any) {
    await this.authservice.getdata('getMyRequests/' + u_id).then(
      (result) => {
        this.getMyRequests = JSON.parse(String(result));
        console.log(this.getMyRequests);
        this.global.set_getMyRequests(this.getMyRequests);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get all by id
  async api_getDailyDonors() {
    await this.authservice.getdata('getlocation').then(
      (result) => {
        this.donor = JSON.parse(String(result));
        console.log(this.donor);
        this.global.set_getDailyDonors(this.donor);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get all by id
  async api_getCountRequests(u_id: any) {
    await this.authservice.getdata('total_requests/' + u_id).then(
      (result) => {
        this.requestCount = JSON.parse(String(result));
        console.log(this.requestCount);
        this.global.set_getDailyRequestsCount(this.requestCount);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get my requests count
  async api_getMyCountRequests(u_id: any) {
    await this.authservice.getdata('my_total_requests/' + u_id).then(
      (result) => {
        this.requestMyCount = JSON.parse(String(result));
        console.log(this.requestMyCount);
        this.global.set_getDailyMyRequestsCount(this.requestMyCount);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get my requests count
  async api_getMyCountCompaings(u_id: any) {
    await this.authservice.getdata('my_total_campaigns/' + u_id).then(
      (result) => {
        this.campaignMyCount = JSON.parse(String(result));
        console.log(this.campaignMyCount);
        this.global.set_getcampaignMyCount(this.campaignMyCount);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //  get my requests count
  async api_getMyDailyCampaigns(u_id: any) {
    await this.authservice.getdata('getMyCampaigns/' + u_id).then(
      (result) => {
        this.getMyCampaigns = JSON.parse(String(result));
        console.log(this.getMyCampaigns);
        this.global.set_getmycampaign(this.getMyCampaigns);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Apicall for geolocation google api
  //  get all by id
  async api_getLocationName(location: any) {
    await this.authservice.getdataforLocation(location).then(
      (result) => {
        this.getAddress = JSON.parse(String(result));
        console.log(this.getAddress);
        this.global.set_getAddress(this.getAddress);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // Post Request
  //  get activity by manual date
  async api_postRequest(data: any) {
    console.log(data);
    await this.authservice.con(data, 'request').then(
      (result: any) => {
        if (result.error == false) {
          this.notification.sendNotification(
            data.blood_type + 'Blood Required ',
            data.description + ' ' + data.status
          );
        }
        this.data = JSON.parse(String(result));
        if (this.data.error == false) {
          this.notification.sendNotification(
            data.blood_type + ' ' + ' Blood Required ',
            data.description + ' ' + data.status
          );
        }
        console.log(this.data);
        console.log(this.data);
        this.toast.toast('Blood Request Created Successfully');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // Post Campaign
  //  get activity by manual date
  async api_postCampaign(data: any) {
    await this.authservice.con(data, 'request').then(
      (result: any) => {
        if (result.error == false) {
          this.notification.sendNotification(
            data.blood_type + ' ' + ' Blood Available ',
            data.description + ' ' + data.status
          );
        }
        this.data = JSON.parse(String(result));
        if (this.data.error == false) {
          this.notification.sendNotification(
            data.blood_type + ' ' + 'Blood Available ',
            data.description + ' ' + data.status
          );
        }
        console.log(this.data);
        console.log(this.data);
        this.toast.toast('Blood Donation Campaign Successfully');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Get Chat Users
  //  get activity by id
  async api_getAllChatHeads(u_id: any) {
    await this.authservice.getdata('getAllChatUsers/' + u_id).then(
      (result) => {
        this.chatHeads = JSON.parse(String(result));
        console.log(this.chatHeads);
        this.global.set_getchatHeads(this.chatHeads);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // get users location
  async api_getAllUserLocation() {
    await this.authservice.getdata('getlocation').then(
      (result) => {
        const location = JSON.parse(String(result));
        console.log(location);
        this.global.set_getDailyDonors(location);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //create activity
  api_getFilter(data: any) {
    this.authservice.con(data, 'getFilter').then(
      async (res) => {
        this.getFilter = JSON.parse(String(res).toString());
        this.global.set_getFilter(this.getFilter);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public getRequester(): Observable<any> {
    return this.http.get('https://learn2earnn.com/products/bepositive/public/getlocation');
  }
}
