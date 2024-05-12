import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanidatesPage } from './canidates.page';

const routes: Routes = [
  {
    path: '',
    component: CanidatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanidatesPageRoutingModule {}
