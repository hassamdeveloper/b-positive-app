import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApicallService } from 'src/app/Services/apicall.service';
import { GlobalService } from 'src/app/Services/global.service';

@Component({
  selector: 'app-donor-filter',
  templateUrl: './donor-filter.page.html',
  styleUrls: ['./donor-filter.page.scss'],
})
export class DonorFilterPage implements OnInit {

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
  cities: any;
  constructor(public apiCall: ApicallService, public global: GlobalService, public modalCtrl: ModalController) { }

  ngOnInit() {
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
  bloodFilter(blood:any) {
    return this.modalCtrl.dismiss({blood:blood, type:'blood'}, 'cancel');
  }
  cityFilter(city:any) {
    return this.modalCtrl.dismiss({city:city.target.value, type:'city'}, 'cancel');
  }
  typeFilter(typeFilter:any) {
    return this.modalCtrl.dismiss({typeFilter:typeFilter, condition:'type'}, 'cancel');
  }
}
