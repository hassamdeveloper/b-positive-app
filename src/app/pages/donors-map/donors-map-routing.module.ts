import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorsMapPage } from './donors-map.page';

const routes: Routes = [
  {
    path: '',
    component: DonorsMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorsMapPageRoutingModule {}
