import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyactivityPage } from './myactivity.page';

const routes: Routes = [
  {
    path: '',
    component: MyactivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyactivityPageRoutingModule {}
