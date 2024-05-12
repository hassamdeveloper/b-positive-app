import { AuthGuard } from './Services/guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'slides',
    loadChildren: () => import('./slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'create-activity',
    loadChildren: () => import('./create-activity/create-activity.module').then( m => m.CreateActivityPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'activity-details',
    loadChildren: () => import('./activity-details/activity-details.module').then( m => m.ActivityDetailsPageModule)
  },
  {
    path: 'canidates',
    loadChildren: () => import('./canidates/canidates.module').then( m => m.CanidatesPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  },
  {
    path: 'new-user',
    loadChildren: () => import('./new-user/new-user.module').then( m => m.NewUserPageModule)
  },
  {
    path: 'myactivity',
    loadChildren: () => import('./myactivity/myactivity.module').then( m => m.MyactivityPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'mapmodal',
    loadChildren: () => import('./pages/mapmodal/mapmodal.module').then( m => m.MapmodalPageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
  {
    path: 'see-donors',
    loadChildren: () => import('./pages/see-donors/see-donors.module').then( m => m.SeeDonorsPageModule)
  },
  {
    path: 'campaign',
    loadChildren: () => import('./pages/campaign/campaign.module').then( m => m.CampaignPageModule)
  },
  {
    path: 'request-blood',
    loadChildren: () => import('./pages/request-blood/request-blood.module').then( m => m.RequestBloodPageModule)
  },
  {
    path: 'donors-map',
    loadChildren: () => import('./pages/donors-map/donors-map.module').then( m => m.DonorsMapPageModule)
  },
  {
    path: 'donor-filter',
    loadChildren: () => import('./pages/donor-filter/donor-filter.module').then( m => m.DonorFilterPageModule)
  },  {
    path: 'experimental',
    loadChildren: () => import('./pages/experimental/experimental.module').then( m => m.ExperimentalPageModule)
  }





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
