import { GlobalService } from 'src/app/Services/global.service';
import { FcmService } from './Services/fcm.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';
import { ApicallService } from './Services/apicall.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public platform: Platform,
    private fcm: FcmService,
    private global: GlobalService,
    private apiCall: ApicallService
  ) {

  }
  async ngOnInit() {
    this.addUid()
    let x;
    await StatusBar.setBackgroundColor({ color: 'c52c69' });
    await StatusBar.setStyle({ style: Style.Light });
    const result: any = await Preferences.get({ key: 'getUser' });
    x = result;
    this.global.add_uid(result.value);
    setInterval(async () => {
      const coordinates: any = await Geolocation.getCurrentPosition();
      console.log(coordinates);
      coordinates.coords.u_id = result.value;
      // this.apiCall.api_postLocation(coordinates.coords);
    }, 10000);
    console.log(x);
    this.fcm.init(result.value);
    this.showStatusBar();
    await SplashScreen.show({
      showDuration: 4000,
      autoHide: true,
    });
    this.platform.ready().then(() => {
      this.OneSignalInit();
    });
    await StatusBar.show();
  }
  async ngOnDestroy() {
    // await SplashScreen.show({
    //   showDuration: 4000,
    //   autoHide: true,
    // });
  }
  async addUid() {
    let x;
    const result: any = await Preferences.get({ key: 'getUser' });
    x = result;
    console.log(x)
    this.global.add_uid(result.value);
    const coordinates = await Geolocation.getCurrentPosition();
    this.apiCall.updateUserLocation({
      u_id: result.value,
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    });
    const coordinate = await Geolocation.watchPosition({ timeout:1000}, (position, err) => {
      console.log(position);
      this.apiCall.updateUserLocation({
        u_id: result.value,
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }
  async showSplash() {
    await this.platform.ready();

    const lottie = (window as any).lottie;

    if (this.platform.is('android') && lottie) {
      await lottie.splashscreen.show('assets/bloodsplash.json', false);
    }
  }
  async showStatusBar() {
    await StatusBar.show();
    await StatusBar.setStyle({ style: Style.Light });
  }
  OneSignalInit() {
    OneSignal.setAppId('16211a51-89c1-4ba3-9c20-35525c9f0b28');
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  }
}
