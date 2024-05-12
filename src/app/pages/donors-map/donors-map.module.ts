import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorsMapPageRoutingModule } from './donors-map-routing.module';

import { DonorsMapPage } from './donors-map.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleMapComponent } from 'src/app/components/google-map/google-map.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorsMapPageRoutingModule
  ],
  declarations: [DonorsMapPage, GoogleMapComponent],
  providers: [GoogleMapComponent]
})
export class DonorsMapPageModule { }
