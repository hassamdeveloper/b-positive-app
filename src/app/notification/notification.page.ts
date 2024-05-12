import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  public notificationsActivity:any;
  public YourActivity:any={u_id:''}
  constructor( public route : Router , public global : GlobalService, public apicall : ApicallService) { }

  ngOnInit() {
    this.getAllActivity();
  }

   

 async getAllActivity(){
   await this.apicall.api_getallActivitybylocation();
   this.global.Storallactivity.subscribe(res =>{
    this.notificationsActivity = res;
   });
  }

  // go to home / tab1 page
  nav_back(){
     this.route.navigate(['/tabs/tab1'])
  }

  // go to filter/ tab 3 page
  funnel(){
    this.getDataactivity();
    this.route.navigate(['/tabs/tab3'])
 }

 async getDataactivity() {
  await this.global.Uid.subscribe(uid => {
     this.YourActivity.u_id = uid;
    });
 await this.apicall.api_getActivity(this.YourActivity.u_id);
 await this.apicall.api_myparticipantActivity(this.YourActivity.u_id);
 await this.apicall.api_getallActivitybylocation();
 await this.apicall.api_getallfilterActivity();
//  await this.apicall.api_getpeopleForChat();
 }

 //show details
 show_details(data){
  console.log(data)
  this.route.navigate(['/activity-details'], { state: { data: data} })
}
}
