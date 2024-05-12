import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {
  @Input() userId :any;
  public profile_data : any;
  constructor(public apicall : ApicallService, public global : GlobalService, public modal : ModalController) { }

 async ngOnInit() {
    console.log(this.userId);
   await this.apicall.api_getuserprofile(this.userId);
  await this.global.Getuserprofile.subscribe( res => {
      this.profile_data = res[0];
    })
  }
  close() {
    this.modal.dismiss(close).then(r => {
      console.log(r);
    });
  }
}
