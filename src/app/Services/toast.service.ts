import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async goingActiviyToast(status) {
    console.log(status);
    const toast = await this.toastController.create({
      message: 'You' +' '+status+' '+ 'to this activity',
      duration: 3000,
      cssClass: 'custom-toast',
      mode: 'ios',
      position : 'top',
      icon: 'checkmark-circle',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }
  async alreadygoingActiviyToast(status) {
    console.log(status);
    const toast = await this.toastController.create({
      message: 'You' +' '+status+' '+ 'to this activity',
      duration: 3000,
      cssClass: 'custom-toast',
      mode: 'ios',
      position : 'top',
      icon: 'checkmark-done-circle',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  async createActiviyToast() {
    const toast = await this.toastController.create({
      message: 'Your activity created successfully',
      duration: 3000,
      cssClass: 'custom-toast',
      mode: 'ios',
      position : 'top',
      icon: 'checkmark-circle',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }
  async loginToast() {
    const toast = await this.toastController.create({
      message: 'Login Successfully',
      duration: 3000,
      cssClass: 'custom-toast',
      mode: 'ios',
      position : 'top',
      icon: 'checkmark-circle',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  async newUserloginToast() {
    const toast = await this.toastController.create({
      message: 'Create a profile before login successfully',
      duration: 3000,
      cssClass: 'custom-toast',
      mode: 'ios',
      position : 'top',
      icon: 'checkmark-circle',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  async profilecreateToast() {
    const toast = await this.toastController.create({
      message: 'Your profile created successfully',
      duration: 3000,
      cssClass: 'custom-toast',
      mode: 'ios',
      position : 'top',
      icon: 'checkmark-circle',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }
  async toast(message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      cssClass: 'custom-toast',
      mode: 'ios',
      position : 'top',
      icon: 'checkmark-circle',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }



}
