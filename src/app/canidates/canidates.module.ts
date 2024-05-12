import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanidatesPageRoutingModule } from './canidates-routing.module';

import { CanidatesPage } from './canidates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CanidatesPageRoutingModule
  ],
  declarations: [CanidatesPage]
})
export class CanidatesPageModule {}
