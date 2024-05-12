import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { ModalController } from "@ionic/angular";
import { MapmodalPage } from '../pages/mapmodal/mapmodal.page';
@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.page.html',
  styleUrls: ['./create-activity.page.scss'],
})
export class CreateActivityPage implements OnInit {

  tabID = 1;

  public activityData : any = {u_id:'', activity_name:'', location:'', description:'', max_atendes:'',
  social_range:'', date:'', start_time:'', end_time:'', a_image:'', visibilty:'', lat:'', lng:''}
  profile_data: any;
  profile: any;
  Togglevaluee: any  = 'public';
  public location:any;
  public YourActivity: any = {u_id:''}
  modalData: any;

  constructor(public route :Router , public apiCall:ApicallService,  public loadingController: LoadingController, public apicall : ApicallService, public global : GlobalService, public modalController: ModalController) { }

  ngOnInit() {
    this.getprofile();
  if(history.state.data !== undefined){
    this.activityData = history.state.data;
    console.log(this.activityData);
  }
  }
  

  async submit_activity_data(){
    if(history.state.data !== undefined){
      console.log("data Update");
      console.log(this.activityData);
      this.activityData.visibilty = this.Togglevaluee;
      await this.apiCall.api_updateActivity(this.activityData)
      // await this.apiCall.api_getActivity(this.YourActivity.u_id);
      this.activityData = {u_id:'', activity_name:'', location:'', description:'', max_atendes:'',
      social_range:'', date:'', start_time:'', end_time:'', a_image:'', visibilty:''}
      this.route.navigate(['/tabs/tab2']);
      this.getDataactivity();
    }
    else{
      if(this.activityData.a_image == ''){
          this.activityData.a_image = "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"
          console.log(this.activityData);
          this.activityData.visibilty = this.Togglevaluee;
          await  this.apiCall.api_postActivity(this.activityData);
          this.activityData = {u_id:'', activity_name:'', location:'', description:'', max_atendes:'',
        social_range:'', date:'', start_time:'', end_time:'', a_image:'', visibilty:''}
          this.getDataactivity();
        }
        else{
          console.log(this.activityData);
          this.activityData.visibilty = this.Togglevaluee;
          await  this.apiCall.api_postActivity(this.activityData);
          this.activityData = {u_id:'', activity_name:'', location:'', description:'', max_atendes:'',
          social_range:'', date:'', start_time:'', end_time:'', a_image:'', visibilty:''}
          this.getDataactivity();
        }
    }
  }


  async getprofile() {
    await this.global.Uid.subscribe(uid => {
      //  this.apiCall.api_getprofile(uid);
       console.log(uid);
       this.activityData.u_id = uid;
       this.YourActivity.u_id = uid;
      });
       this.global.Getactivity.subscribe(res => {
       console.log(res)
      this.profile = res; 
    });
   }


  go_back(){
    this.route.navigate(['/tabs/tab1']);
    this.tabID = 1 ;
  }

  go_form_one(){
    this.tabID = 1 ;
  }

  presentLoading() {
  console.log(this.tabID)
  this.tabID = 2;
  console.log(this.tabID)
  }

  async changeToggle($event: CustomEvent) {
    console.log($event.detail.checked);
    console.log($event.detail.value);
    if ($event.detail.checked == true) {
          this.Togglevaluee = 'private'
          console.log(this.activityData.visibilty);
    }
    else{
      this.Togglevaluee = 'public'
      console.log(this.activityData.visibilty);
    }


  }

  async capture_img(){
    const image = await Camera.getPhoto({
      quality:90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt,
      allowEditing: false
    });
    // document.getElementById('cameraImage').setAttribute('src', `data:image/${image.format};base64,`+image.base64String );
    console.log(image.base64String);
    this.activityData.a_image = image.base64String;
  }

  async getDataactivity() {
    await this.apicall.api_getActivity(this.YourActivity.u_id);
    await this.apicall.api_myparticipantActivity(this.YourActivity.u_id);
    await this.apicall.api_getallActivitybylocation();
    await this.apicall.api_getallfilterActivity();
    // await this.apicall.api_getpeopleForChat();
    }
  //  Map Modal
  async openModal() {
    const modal = await this.modalController.create({
      component: MapmodalPage
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log(data);
    this.location = data
    this.activityData.lat = data.lat;
    this.activityData.lng = data.lng;
    return await modal.present();
  }
}
