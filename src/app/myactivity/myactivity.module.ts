import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyactivityPageRoutingModule } from './myactivity-routing.module';

import { MyactivityPage } from './myactivity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyactivityPageRoutingModule
  ],
  declarations: [MyactivityPage]
})
export class MyactivityPageModule {}
