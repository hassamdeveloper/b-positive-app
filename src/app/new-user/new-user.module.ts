import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewUserPageRoutingModule } from './new-user-routing.module';

import { NewUserPage } from './new-user.page';
import { SearchableSelectComponent } from '../components/searchable-select/searchable-select.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewUserPageRoutingModule,
    SearchableSelectComponent,
    Ng2SearchPipeModule,
  ],
  declarations: [NewUserPage],
})
export class NewUserPageModule {}
