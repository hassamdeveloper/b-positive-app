import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  async set(key:any , value:any) {
    await Preferences.set({
      key: key,
      value: value,
    });
  };
  
  async check(key:any){
    const { value } = await Preferences.get({ key: key });
  
    return value;
  };
  
  async remove(key:any) {
    await Preferences.remove({ key: key });
  };
}
