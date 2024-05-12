import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
export const apiUrl = 'http://localhost/bepositive/public/';
// export const apiUrl = 'https://learn2earnn.com/products/bepositive/public/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public http: HttpClient, private router: Router) { }

  con(data: any, type: any) {
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, JSON.stringify(data)).subscribe(
        (res) => {
          resolve(JSON.stringify(res));
        },
        (err) => {
          reject(err);
          console.log(err);
        }
      );
    });
  }

  // geting posts

  getdata(type: any) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + type).subscribe(
        (res) => {
          resolve(JSON.stringify(res));
        },
        (err) => {
          reject(err);
          console.log(err);
        }
      );
    });
  }

  // For Get Location by Lat and Lng
  getdataforLocation(location: any) {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          location.lat +
          ',' +
          location.lng +
          '&key=AIzaSyA5Tu8FW1RyrQJTE34qpEngUbbe8_V_2ts'
        )
        .subscribe(
          (res) => {
            resolve(JSON.stringify(res));
          },
          (err) => {
            reject(err);
            console.log(err);
          }
        );
    });
  }

  // Prefrences
  async isLoggedIn(): Promise<boolean> {
    let x;
    await Preferences.get({ key: 'getUser' }).then((result) => {
      x = result.value;
      console.log(x);
    });
    if (x == null) {
      return true;
    } else this.router.navigate(['/tabs/tab1']);
    return false;
  }
  async logout() {
    await Preferences.remove({ key: 'getUser' });
  }
}
