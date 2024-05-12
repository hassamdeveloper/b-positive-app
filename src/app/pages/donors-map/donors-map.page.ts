import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { GmapsService } from 'src/app/Services/gmap.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Services/global.service';
import { LocationsService } from 'src/app/Services/locations.service';
import { ApicallService } from 'src/app/Services/apicall.service';
import { IonSelect, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
const apiKey = environment.mapsKey;
import { markers } from 'src/app/tab1/data';
import { SeeRequestsComponent } from 'src/app/components/see-requests/see-requests.component';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';
// Interface
interface Request {
  name: string;
  p_img: string;
  phone: string;
  city: string;
  r_id: number;
  u_id: string;
  description: string;
  location: string;
  lat: string;
  lng: string;
  img: string;
  date: string;
  blood_type: string;
  status: string;
  type: string;
}

@Component({
  selector: 'app-donors-map',
  templateUrl: './donors-map.page.html',
  styleUrls: ['./donors-map.page.scss'],
})
export class DonorsMapPage implements OnInit {

  @ViewChild(IonSelect) public selector: ElementRef;
  public allRequests: Request[];
  public uid: string;
  public markers: any;
  public mapType: any = 'requests';
  public allUsers: any[] = [];
  public requestsDataLoaded: boolean = false;
  public donosDataLoaded: boolean = false;
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
  public bloodGroup: any = 'all';
  public constructor(
    public route: Router,
    public global: GlobalService,
    public location: LocationsService,
    public apiCall: ApicallService,
    private modalCtrl: ModalController,
    private googleMap: GoogleMapComponent
  ) { }

  public ngOnInit(): void {
    this.getAllRequests();
  }
  public ionViewDidEnter(): void {
    // this.getAllRequests();
  }
  async getAllRequests() {
    await this.apiCall.api_getDailyRequests(this.uid);
    this.global.Requests.subscribe((res) => {
      this.allRequests = res;
      this.requestsDataLoaded = true
      this.donosDataLoaded = false
    });
  }
  async getProfile() {
    await this.global.Uid.subscribe((uid) => {
      this.uid = uid;
    });
  }
  public async openModal(request: any): Promise<void> {
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
  ionViewDidLeave() {
  }
  public async changeMapType($event: any): Promise<void> {
    this.mapType = $event.target.value;
    this.bloodGroup = 'all';
  }
  public selectBlood(blood:any) :void  {
    const map = 'custom-' + this.mapType;
    console.log(map);
  }
}
