import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonorFilterPage } from './donor-filter.page';

const routes: Routes = [
  {
    path: '',
    component: DonorFilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonorFilterPageRoutingModule {}
