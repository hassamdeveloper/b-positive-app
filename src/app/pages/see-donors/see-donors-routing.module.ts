import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeeDonorsPage } from './see-donors.page';

const routes: Routes = [
  {
    path: '',
    component: SeeDonorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeeDonorsPageRoutingModule {}
