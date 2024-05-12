import { Router } from '@angular/router';
import { GlobalService } from '../Services/global.service';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController, ViewDidEnter } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApicallService } from '../Services/apicall.service';
import { markers } from './data/index';
import { LocationsService } from '../Services/locations.service';
import { interval, timer } from 'rxjs';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { GmapsService } from 'src/app/Services/gmap.service';
import { Geolocation } from '@capacitor/geolocation';
import { SeeRequestsComponent } from '../components/see-requests/see-requests.component';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements ViewDidEnter {
  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  public user: any = { name: '', image: '' };
  public hello: any = '';
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
  googleMaps: any;
  center = { lat: '', lng: '' };
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];
  // Map Variables
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  // segment value
  public selectTabs: any = 'map';

  public profile_data: any = {
    u_id: '',
    name: '',
    img: '',
    bio: '',
    socialize_distance: '',
  };
  public Profile: any;
  private userName: any;
  uid: any;
  public googleMap: any;
  allRequests: any;
  totalRequests: any = 0;
  alldonors: any = 0;
  constructor(
    public route: Router,
    public global: GlobalService,
    public location: LocationsService,
    public apiCall: ApicallService,
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private modalCtrl: ModalController
  ) {
    this.getUserData()
    var day = new Date();
    var hr = day.getHours();
    if (hr >= 0 && hr < 12) {
      this.hello = 'Good Morning!';
    } else if (hr == 12) {
      this.hello = 'Good Noon!';
    } else if (hr >= 12 && hr <= 17) {
      this.hello = 'Good Afternoon!';
    } else {
      this.hello = 'Good Evening!';
    }

    this.apiCall.api_getDailyDonors();
    this.global.Donors.subscribe((res) => {
      this.alldonors = res.length;
      console.log(this.alldonors);
    });

  }
  async ngOnInit() {
    this.printCurrentPosition();
    this.getUid();
    this.getProfile();
    await StatusBar.setBackgroundColor({ color: 'f5f6f9' });
    await StatusBar.setStyle({ style: Style.Light });
    const result: any = await Preferences.get({ key: 'getUser' });
    this.global.add_uid(result.value);
    this.getAllRequests();
  }
  async ngAfterViewInit() {
    // this.loadMap();
    await StatusBar.setBackgroundColor({ color: 'f5f6f9' });
    await StatusBar.setStyle({ style: Style.Light });

  }
  public async getUserData(): Promise<void> {
    const x: any = await Preferences.get({ key: 'getUser' });
    const user = JSON.parse(x);
    console.log(x)
    this.uid = user.u_id;
    this.userlocation.u_id = user.u_id;
  }
  printCurrentPosition = async () => {
    const result: any = await Preferences.get({ key: 'getUser' });
    const coordinates: any = await Geolocation.getCurrentPosition();
    console.log('Current position:', coordinates.coords);
    const x = {
      u_id: result.value,
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
    this.apiCall.api_postLocation(x);
    setInterval(() => {
      this.apiCall.api_postLocation(x);
    }, 10000);
  };
  addMarker(location) {
    //console.log(location);
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: this.Profile,
      scaledSize: new googleMaps.Size(50, 50),
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      // draggable: true,
      // animation: googleMaps.Animation.DROP
    });
    this.markers.push(marker);
    // this.presentActionSheet();
    this.markerClickListener = this.googleMaps.event.addListener(
      marker,
      'click',
      () => {
        //console.log('markerclick', marker);
        // this.checkAndRemoveMarker(marker);
        //console.log('markers: ', this.markers);
      }
    );
    for (let i = 0; i < this.notificationsActivity.length; i++) {
      //console.log(this.notificationsActivity[i]);
      //console.log(`${this.notificationsActivity[i].lng}`);
      const lat = `${this.notificationsActivity[i].lat}`;
      const lng = `${this.notificationsActivity[i].lng}`;
      const locations = new this.googleMap.LatLng(lat, lng);
      //console.log(locations);
      let googleMaps: any = this.googleMaps;
      const icon = {
        url: this.notificationsActivity[i].a_image,
        scaledSize: new googleMaps.Size(50, 50),
      };
      const marker = new googleMaps.Marker({
        position: locations,
        map: this.map,
        icon: icon,
        // draggable: true,
        // animation: googleMaps.Animation.DROP
      });
      this.markers.push(marker);
    }
  }

  checkAndRemoveMarker(marker) {
    const index = this.markers.findIndex(
      (x) =>
        x.position.lat() == marker.position.lat() &&
        x.position.lng() == marker.position.lng()
    );
    //console.log('is marker already: ', index);
    if (index >= 0) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      return;
    }
  }
  ngOnDestroy() {
    // this.googleMaps.event.removeAllListeners();
    if (this.mapClickListener)
      this.googleMaps.event.removeListener(this.mapClickListener);
    if (this.markerClickListener)
      this.googleMaps.event.removeListener(this.markerClickListener);
    // this.loadMap();
  }
  async getProfile() {
    // const x = localStorage.getItem('bp-user');
    await this.global.Uid.subscribe(async (uid) => {

      this.uid = uid;
      await this.apiCall.api_getprofile(this.uid);
      //console.log(this.uid);
      await this.global.ProfileInfo.subscribe((res) => {
        this.user.name = res[0].name;
        this.user.image = res[0].img;
        //console.log(res[0].img);
        this.Profile = res[0];
      });
      this.userlocation.u_id = uid;
      console.log(
        '🚀 ~ file: tab1.page.ts:216 ~ Tab1Page ~ awaitthis.global.Uid.subscribe ~ uid:',
        uid
      );
    });
    const x: any = await Preferences.get({ key: 'getUser' });
    const user = JSON.parse(x);
    console.log(user)
    this.uid = user.u_id;
    this.userlocation.u_id = user.u_id;

    setInterval(async () => {
      // this.apiCall.api_postLocation(this.userlocation);
      // const storage = await Preferences.get({ key: 'profile' });
      // const user: any = storage.value;
      // console.log(user.name);
      // if (user !== undefined) {
      //   this.user.name = user.name;
      // }
    }, 10000);
  }

  public coords: any = [{ coordinate: { lat: 33.2, lng: -117.8 } }];
  public coordinates: any;

  public userlocation: any = { u_id: '', lng: '', lat: '' };

  public notificationsActivity: any;
  public YourActivity: any = { u_id: '' };

  async getAllRequests() {
    const uid: string = this.uid;
    await this.apiCall.api_getDailyRequests(this.uid);
    this.global.Requests.subscribe((res) => {
      this.allRequests = res;
      //console.log(res);
    });
    await this.apiCall.api_getDailyDonors();
    this.global.Donors.subscribe((res) => {
      this.alldonors = res.length;
      console.log(this.alldonors);
    });
    await this.apiCall.api_getCountRequests(this.uid);
    this.global.RequestsCount.subscribe((count) => {
      this.totalRequests = count.total_requests;
    });
  }

  show_details(data) {
    //console.log(data);
    this.route.navigate(['/activity-details'], { state: { data: data } });
  }

  async get_appData() {
    await this.apiCall.api_getActivity(this.uid);
    await this.apiCall.api_myparticipantActivity(this.uid);
    await this.apiCall.api_getallfilterActivity();
    // await this.apiCall.api_getpeopleForChat();
  }

  // navigation
  notification() {
    this.getAllRequests();
    this.get_appData();
    this.route.navigate(['/tabs/notification']);
  }
  profile() {
    this.route.navigate(['/tabs/profile']);
  }

  // show activity details
  // show_details(data){
  //   this.route.navigate(['/tabs/activity-details']);
  //   this.global.set_activity_details(data);
  // }

  // Map Function
  async ionViewDidEnter() {
    await StatusBar.setBackgroundColor({ color: 'f5f6f9' });
    await StatusBar.setStyle({ style: Style.Light });
    this.getUid();
    this.getProfile();
    // const ticker = timer(0, 5000);
    // ticker.subscribe(() => {
    //   this.getLocation();
    // });
    this.getAllRequests();
  }
  async getUid() {
    let x;
    await Preferences.get({ key: 'getUser' }).then((result) => {
      x = result.value;
      this.global.add_uid(x);
      //console.log(x);
    });
  }
  async postLocation() {
    // await this.apiCall.api_postLocation(this.userlocation);
  }

  async createMap() {
    // const coordinates = await Geolocation.getCurrentPosition();
    // //console.log('Current position:', coordinates);
    // this.getAllActivity();
    // this.get_appData();
    // // Get Current Locations
    // await this.getLocation();
    // // Create Map
    // const mapRef = document.getElementById('my-cool-map');
    // this.newMap = await GoogleMap.create({
    //   id: 'my-cool-map',
    //   element: this.mapRef.nativeElement,
    //   apiKey: environment.mapsKey,
    //   config: {
    //     center: {
    //       lat: coordinates.coords.latitude,
    //       lng: coordinates.coords.longitude,
    //     },
    //     zoom: 15,
    //   }
    // });
    // await this.newMap.enableClustering();
    // // Add Markers
    // this.newMap.addMarkers([
    //   {
    //     coordinate:{
    //       lat: coordinates.coords.latitude,
    //       lng: coordinates.coords.longitude
    //     },
    //     title:this.userName,
    //     snippet:"Zagham",
    //     iconUrl: "https://turbonowpk.com/activity/images/2211011667330422.8122.jpg",
    //     iconSize: {
    //       width: 40,
    //       height:36
    //     },
    //     iconAnchor: {
    //       x: 5,
    //       y: 5
    //     }
    //   }
    // ])
    // for(let i=0; i<this.notificationsActivity.length; i++) {
    //   //console.log(this.notificationsActivity[i]);
    //   //console.log(`${this.notificationsActivity[i].lng}`);
    //   const x = this.notificationsActivity[i].lng
    //   const lat:number =  +x;
    //   const y = this.notificationsActivity[i].lat
    //   const lng = +y;
    //   //console.log(lat, lng)
    //   this.newMap.addMarkers([
    //     {
    //       coordinate:{
    //         lat: lat,
    //         lng: lng
    //       },
    //       title:this.notificationsActivity[i].name,
    //       snippet:"Zagham",
    //       iconUrl: "this.notificationsActivity[i].a_image",
    //       iconSize: {
    //         width: 40,
    //         height:36
    //       }
    //     }
    //   ])
    // }
    //  await this.newMap.setOnMarkerClickListener(async (marker) => {
    //   //console.log(marker);
    //  });
    // await this.newMap.setOnMapClickListener(async (marker) => {
    //   //console.log(marker)
    // })
  }
  // GeoLocation
  // async getLocation() {
  //   this.coordinates = await Geolocation.getCurrentPosition();

  //   //console.log('Current position:', this.coordinates.coords.latitude);
  //   //console.log('Current position:', this.coordinates.coords.longitude);
  //   this.userlocation.lat = this.coordinates.coords.latitude;
  //   this.userlocation.lng = this.coordinates.coords.longitude;
  //   //console.log(this.userlocation);
  //   this.postLocation();
  // }

  // Get Distance
  async getLocationDistances() {
    for (let i = 0; i < markers.length; i++) {
      const x = this.location.getDistanceFromLatLonInKm(
        markers[0].lat,
        markers[0].lng,
        markers[1].lat,
        markers[1].lng
      );
      //console.log(x);
    }
  }

  // New Blood Donor Code
  checkGroup(value: any) {
    const includes = value.type.includes('-');
    return includes;
  }
  // Available Donors
  seeDonor() {
    this.route.navigate(['see-donors']);
  }
  seeDonorbyType(group: any) {
    this.route.navigate(['see-donors'], { state: { data: group.type } });
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
  // Slides
  onSwiper([swiper]) {
    //console.log(swiper);
  }
  onSlideChange() {
    //console.log('slide change');
  }
  goToCampaign() {
    this.route.navigate(['campaign']);
  }
  goToRequestBlood() {
    this.route.navigate(['request-blood']);
  }
  goToProfile() {
    this.route.navigate(['profile']);
  }
  goToRequests() {
    this.route.navigate(['tabs/tab2']);
  }
}
