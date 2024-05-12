import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApicallService } from '../Services/apicall.service';
import { GlobalService } from '../Services/global.service';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { initializeApp } from 'firebase/app';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase  from 'firebase/compat/app'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public UserData: any = { u_id: '', token: '' };

  constructor(
    public apiCall: ApicallService,
    public global: GlobalService,
    public platform: Platform,private angularFireAuth:AngularFireAuth
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    initializeApp(environment.firebaseConfig);
    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Dark });
  }
  ionViewDidEnter() {
    this.addListeners();
  }
  addListeners = async () => {
    await PushNotifications.addListener('registration', (token) => {
      console.info('Registration token: ', token.value);
      this.UserData.token = token.value;
    });
  };
  signInWithGoogle(){
    console.log("sign in google started");
    const provider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.signInWithPopup(provider).then((res:any)=>{
      const user = res.additionalUserInfo
    this.global.add_uid(user.profile.id);
    this.UserData.u_id = user.profile.id;
    this.apiCall.api_postLogin(this.UserData);
    })
  }
  // async googleLogin() {
  //   console.log('Google login program');
  //   const result = await FirebaseAuthentication.signInWithGoogle();
  //   // const result = await GoogleAuth.signIn();
  //   console.log(result);
    // this.global.add_uid(result.user.uid);
    // this.UserData.u_id = result.user.uid;
    // const coordinates: any = await Geolocation.getCurrentPosition();
    // console.log(coordinates);
    // coordinates.coords.u_id = result.user.uid;
    // // this.apiCall.api_postLocation(coordinates.coords);
    // this.apiCall.api_postLogin(this.UserData);
  // }

  async facebookLogin() {
    console.log('Facebook login program');

    const result = await FirebaseAuthentication.signInWithFacebook();
    console.log(result);
    this.global.add_uid(result.user.uid);
    this.UserData.u_id = result.user.uid;
    // this.UserData.u_id = '5787855'
    const coordinates = '';
    console.log('Current position:', coordinates);
    this.apiCall.api_postLogin(this.UserData);
    // this.apiCall.api_postLocation({
    //   u_id: result.user.uid,
    //   lat: coordinates.coords.latitude,
    //   lng: coordinates.coords.longitude,
    // });
    // return result.user;
  }
  signInWithPhoneNumber = async () => {
    // const { verificationId } =
    //   await FirebaseAuthentication.signInWithPhoneNumber({
    //     phoneNumber: '923002951779',
    //   });
    // const verificationCode = window.prompt(
    //   'Please enter the verification code that was sent to your mobile device.'
    // );
    // const result = await FirebaseAuthentication.signInWithPhoneNumber({
    //   verificationId,
    //   verificationCode,
    // });
    // return result.user;
  };
  initializeApp() {
    this.platform.ready().then(() => {
      // GoogleAuth.initialize();
    });
  }
}
