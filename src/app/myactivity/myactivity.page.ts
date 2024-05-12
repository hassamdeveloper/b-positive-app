import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-myactivity',
  templateUrl: './myactivity.page.html',
  styleUrls: ['./myactivity.page.scss'],
})
export class MyactivityPage implements OnInit {
  public details :any;
  public data : any;

  constructor( public route :Router , public global :GlobalService, public apicall : ApicallService ) { }

  ngOnInit() {
    this.data = history.state.data;
    console.log(this.data);
    
  }
  

  //navigation
  nav_back(){
    this.route.navigate(['tabs/tab2'])
  }


}
