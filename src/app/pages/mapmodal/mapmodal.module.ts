import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapmodalPageRoutingModule } from './mapmodal-routing.module';

import { MapmodalPage } from './mapmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapmodalPageRoutingModule
  ],
  declarations: [MapmodalPage]
})
export class MapmodalPageModule {}
