import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/Services/apicall.service';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-see-requests',
  templateUrl: './see-requests.component.html',
  styleUrls: ['./see-requests.component.scss'],
})
export class SeeRequestsComponent implements OnInit {
  @Input() Request: any;
  name: string;
  public distance: any;
  public userData: any = { incoming_key: '', outgoing_key: '' };

  constructor(
    private modalCtrl: ModalController,
    public route: Router,
    public apiCall: ApicallService,
    public global: GlobalService
  ) {}
  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    var distance = this.getDistance(
      coordinates.coords.latitude,
      coordinates.coords.longitude,
      this.Request.lat,
      this.Request.lng
    );
    console.log(distance + ' km');
    if (distance < 1000) {
      this.distance = distance.toFixed(2) + 'M';
    }
    if (distance > 1000) {
      this.distance = (distance / 1000).toFixed(2) + ' KM';
    }
  };

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
  getDistance(lat1, lng1, lat2, lng2) {
    var R = 6371000; // Radius of the earth in meters
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLng = this.deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in meters
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  gotoMap() {
    this.route.navigate(['tabs/donors-map']);
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  //show_chat
  async show_chat(user) {
    console.log(user);
    console.log(this.userData);
    this.userData.reciever_id = user.u_id;
    await this.apiCall.api_getChat(this.userData);
    this.global.set_chat(user);
    const x = { data: user.u_id, userData: user };
    this.route.navigate(['chat'], { state: { data: user } });
    this.cancel();
  }
}
