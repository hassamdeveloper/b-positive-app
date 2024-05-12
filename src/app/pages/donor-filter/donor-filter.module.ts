import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorFilterPageRoutingModule } from './donor-filter-routing.module';

import { DonorFilterPage } from './donor-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorFilterPageRoutingModule
  ],
  declarations: [DonorFilterPage]
})
export class DonorFilterPageModule {}
