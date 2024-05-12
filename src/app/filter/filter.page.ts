import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {


  public btnRangeData : any = [{id: 1, range:100},{id: 2, range:200},{id: 3, range:300},
  {id: 4, range:400},{id: 5, range:500},{id: 6, range:600},]

  public activitybyDate : any = {date:''}

  constructor(public route : Router, public global: GlobalService, public apicall : ApicallService) { }


  ngOnInit() {
  }

  go_to_search(){
    this.route.navigate(['/tabs/tab3']);
  }

 async getactivitySocialRange(range){
   await this.apicall.api_getactivitySocialRange(range)
  }
  getactivity(event){
    const x = event.detail.value;
    console.log(x);    
    this.apicall.api_getactivitySocialRange(x)
  }
 async getcurrentDateActivity(){
   await this.apicall.api_getcurrentDateactivity()
  }
 async getOneWeekActivity(){
   await this.apicall.api_getoneWeekactivity()
  }
 async getactivitybyDate(event){
  console.log(event.detail.value);
    this.activitybyDate.date = event.detail.value
    console.log(this.activitybyDate);    
   await this.apicall.api_getactivitybymanualDate(this.activitybyDate)
  }


}
