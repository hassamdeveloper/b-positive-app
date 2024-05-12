import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExperimentalPageRoutingModule } from './experimental-routing.module';

import { ExperimentalPage } from './experimental.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExperimentalPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ExperimentalPage]
})
export class ExperimentalPageModule {}
