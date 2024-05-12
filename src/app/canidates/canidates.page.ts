import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-canidates',
  templateUrl: './canidates.page.html',
  styleUrls: ['./canidates.page.scss'],
})
export class CanidatesPage implements OnInit {

  selectTabs :any= 'going'

   public going : any = [ { id:1 , user_img:'../../assets/Rectangle 144.png' , user_name: 'William'},{ id:2 , user_img:'../../assets/Rectangle 144.png' , user_name: 'William'}, ]

   public may_be_going : any = [ { id:1 , user_img:'../../assets/Rectangle 144.png' , user_name: 'Miller'},{ id:2 , user_img:'../../assets/Rectangle 144.png' , user_name: 'Miller'}, ]

   public allStatus : any;
   public Going : any;
   public MaybeGoing : any;
   public userData: any = {incoming_key:'', outgoing_key:''};
  constructor(public route :Router, public global : GlobalService, public apicall : ApicallService ) { }

  ngOnInit() {
    this.global.Uid.subscribe(uid => {
      this.userData.sender_id = uid;
      console.log(uid);
     });
    this.getAllStatus();
  
  }

  

  async getAllStatus(){
   await this.global.GetActivityStatus.subscribe(res =>{
            this.allStatus = res;
            console.log(this.allStatus);
            this.Going = this.allStatus.filter(x => x.status === 'g');
            console.log(this.Going);
            this.MaybeGoing = this.allStatus.filter(x => x.status === 'm');
            console.log(this.MaybeGoing);         
    });
  }

  async  show_chat(data){
    console.log(data);
    console.log(this.userData);
    this.userData.reciever_id = data.u_id
    await this.apicall.api_getChat(this.userData);
    this.global.set_chat(data);
    const x = {data:data.u_id, userData:data}
    this.route.navigate(['chat'], {state:{data: data}})
  }

  go_back(){
     this.route.navigate(['/tabs/tab1'])
  }
}
