import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


  public YourActivity:any={u_id:''}

  constructor(public route : Router, public apicall : ApicallService, public global : GlobalService) {}
  
  nav(){
    this.route.navigate(['/tabs/donors-map']);
    this.getDataactivity();
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



}
