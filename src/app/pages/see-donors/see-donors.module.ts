import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeeDonorsPageRoutingModule } from './see-donors-routing.module';

import { SeeDonorsPage } from './see-donors.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeeDonorsPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [SeeDonorsPage],
})
export class SeeDonorsPageModule {}
