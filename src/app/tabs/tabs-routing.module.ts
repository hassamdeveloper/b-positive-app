import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab5',
        loadChildren: () => import('../tab5/tab5.module').then(m => m.Tab5PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'donors-map',
        loadChildren: () => import('./../pages/donors-map/donors-map.module').then(m => m.DonorsMapPageModule)
      },
      {
        path: 'activity-details',
        loadChildren: () => import('../activity-details/activity-details.module').then(m => m.ActivityDetailsPageModule)
      },
      {
        path: 'canidates',
        loadChildren: () => import('../canidates/canidates.module').then(m => m.CanidatesPageModule)
      },
      {
        path: 'filter',
        loadChildren: () => import('../filter/filter.module').then(m => m.FilterPageModule)
      },
  {
    path: 'myactivity',
    loadChildren: () => import('../myactivity/myactivity.module').then( m => m.MyactivityPageModule)
  },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
