import { AuthService } from './../Services/auth.service';
import { Preferences } from '@capacitor/preferences';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CheckboxCustomEvent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { img } from '../new-user/image';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public update: boolean = false;
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
  @ViewChild(IonModal) modal: IonModal;
  public isOpen: boolean = false;
  canDismiss = false;

  presentingElement = null;
  public profile_data: any = {
    u_id: '',
    name: '',
    img: '',
    email: '',
    gender: '',
    phone: '',
    age: '',
    blood: '',
    city: '',
  };
  public cities: any;
  public profile: any = {
    u_id: '',
    name: '',
    img: '',
    email: '',
    gender: '',
    phone: '',
    age: '',
    blood: '',
    city: '',
  };
  message: string;

  public results;
  public search: any;
  selectedCity: any = 'Select City';
  gender: string;
  constructor(
    public apiCall: ApicallService,
    private router: Router,
    public global: GlobalService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.getprofile();
    this.presentingElement = document.querySelector('.ion-page');
    this.getAllCities();
  }

  // Get All Cities
  getAllCities() {
    this.apiCall.getAllCities();
    this.global.Cities.subscribe((cities) => {
      this.cities = cities;
      console.log(this.cities);
    });
  }
  async submit_profile_data() {
    console.log(this.profile);
    // if (this.profile.img == '') {
    //   this.profile.img = img;
    // }
    await this.apiCall.api_updateprofile(this.profile);
    this.update = false;

    // this.profile = {
    //   u_id: '',
    //   name: '',
    //   img: '',
    //   email: '',
    //   gender: '',
    //   phone: '',
    //   age: '',
    //   blood: '',
    //   city: ''
    // };
    this.getprofile();
  }

  async getprofile() {
    await this.global.Uid.subscribe((uid) => {
      //  this.apiCall.api_getprofile(uid);
      console.log(uid);
      this.profile_data.u_id = uid;
    });
    this.global.ProfileInfo.subscribe(async (res) => {
      console.log(res);
      this.profile = await res[0];
      console.log(this.profile);
      document
        .getElementById('cameraImage')
        .setAttribute('src', this.profile.img);
      if (this.profile.gender == 'male') {
        this.gender = 'M';
      } else if (this.profile.gender == 'female') {
        this.gender = 'F';
      }
    });
  }

  // get image
  async capture_img() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
    });
    document
      .getElementById('cameraImage')
      .setAttribute(
        'src',
        `data:image/${image.format};base64,` + image.base64String
      );
    console.log(image.base64String);
    this.profile.img = image.base64String;
  }
  // Modal
  open() {
    this.modal.present();
    console.log('h');
  }
  confirm() {
    this.modal.dismiss('zagham', 'confirm');
  }
  onTermsChanged(event: any) {
    this.modal.dismiss(event, 'confirm');
    console.log(this.canDismiss);
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      const x: any = ev.detail.data;
      this.selectedCity = x.name;
      this.profile.city = x.name;
    }
    console.log(event);
  }
  // Logout
  async logout() {
    this.auth.logout();
    this.router.navigate(['login']);
    await FirebaseAuthentication.signOut();
  }
  // search
  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.cities.filter(
      (d) => d.name.toLowerCase().indexOf(query) > -1
    );
    console.log(this.results);
  }
  is_update() {
    this.update = !this.update;
    document
      .getElementById('cameraImage')
      .setAttribute('src', this.profile.img);
  }
}
