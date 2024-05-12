import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CheckboxCustomEvent, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { ApicallService } from 'src/app/Services/apicall.service';
import { GlobalService } from 'src/app/Services/global.service';
import { MapmodalPage } from '../mapmodal/mapmodal.page';
import { img } from './../../new-user/image';
@Component({
  selector: 'app-request-blood',
  templateUrl: './request-blood.page.html',
  styleUrls: ['./request-blood.page.scss'],
})
export class RequestBloodPage implements OnInit {
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
  public cities: any;
  public profile: any;
  public compaign:any = {
  u_id: '',
  description: 'I want to donate my blood',
  location: '',
  city: '',
  lat: '',
  lng: '1',
  img: img,
  date: '',
  blood_type: '',
  status: 'donation request',
  type: 'donor'
}
  message: string;

  public results;
  public search: any;
  selectedCity: any = 'Select City';
  public location:any = 'Choose Location';
  constructor(
    public apiCall: ApicallService,
    private router: Router,
    public global: GlobalService,
    public modalController: ModalController
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
  async submit_request() {
    const date = new Date();
    const dateString = date.toISOString().split('T')[0];
    console.log(dateString);
    this.compaign.date = dateString;
    this.compaign.type = 'donor';
    if (this.compaign.img == '') {
      this.compaign.img = img;
    }
    // post campaign
    await this.apiCall.api_postCampaign(this.compaign);

    this.compaign = {
  u_id: '',
  description: '',
  location: '',
  city: '',
  lat: '',
  lng: '1',
  img: '2',
  date: '',
  blood_type: '',
  status: '',
  type: ''
}
this.router.navigate(['tabs/tab2']);
    // document
    //   .getElementById('cameraImage')
    //   .setAttribute('src', 'assets/blood-donor.png');
  }

  async getprofile() {
    await this.global.Uid.subscribe((uid) => {
      //  this.apiCall.api_getprofile(uid);
      console.log(uid);
      this.compaign.u_id = uid;
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
    this.compaign.img = image.base64String;
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
      this.compaign.city = x.name;
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
 //  Map Modal
  async openModal() {
    const modal = await this.modalController.create({
      component: MapmodalPage
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(data);
    await this.apiCall.api_getLocationName(data);
    this.global.GetAddress.subscribe((location:any) => {
      const locate:any[] = location.results
      console.log(locate[3].formatted_address);
      this.location =  locate[3].formatted_address;
      this.compaign.location = this.location;
    })
    this.compaign.lat = data.lat;
    this.compaign.lng = data.lng;
    return await modal.present();
  }

}
