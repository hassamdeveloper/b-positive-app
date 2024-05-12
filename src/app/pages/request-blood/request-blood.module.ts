import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestBloodPageRoutingModule } from './request-blood-routing.module';

import { RequestBloodPage } from './request-blood.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestBloodPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [RequestBloodPage]
})
export class RequestBloodPageModule {}
