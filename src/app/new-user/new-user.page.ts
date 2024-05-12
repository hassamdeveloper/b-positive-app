import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CheckboxCustomEvent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { img } from './image';
import { Preferences } from '@capacitor/preferences';
import { City } from 'country-state-city';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  public cities: any[] = []
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
  public profile: any;
  message: string;

  public results;
  public search: any;
  selectedCity: any = 'Select City';
  constructor(
    public apiCall: ApicallService,
    private router: Router,
    public global: GlobalService
  ) {
    this.cities = City.getCitiesOfState('PK', 'PB')
    console.log(this.cities)
  }

  ngOnInit() {
    this.getprofile();
    this.presentingElement = document.querySelector('.ion-page');
    // this.getAllCities();
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
    console.log(this.profile_data);
    if (this.profile_data.img == '') {
      this.profile_data.img = img;
    }
    await this.apiCall.api_postProfile(this.profile_data);

    this.profile_data = {
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
    document
      .getElementById('cameraImage')
      .setAttribute('src', 'assets/blood-donor.png');
  }

  async getprofile() {
    await this.global.Uid.subscribe((uid) => {
      //  this.apiCall.api_getprofile(uid);
      console.log(uid);
      this.profile_data.u_id = uid;
    });
    this.global.ProfileInfo.subscribe((res) => {
      console.log(res);
      this.profile = res;
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
    this.profile_data.img = image.base64String;
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
      this.profile_data.city = x.name;
    }
    console.log(event);
  }
  // search
  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.cities.filter(
      (d) => d.name.toLowerCase().indexOf(query) > -1
    );
    console.log(this.results);
  }
}
