import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserTabsPage } from './user-tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: UserTabsPage,
    children : [
       { path: 'user-home', children : [
          {
            path : '',loadChildren: () => import('../user-home/user-home.module').then( m => m.UserHomePageModule)
          },
          { 
              path: 'user-dashboard/:id',
              loadChildren: () => import('../user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
          },
          {
            path: 'ads/:id', loadChildren: () => import('../ads/ads.module').then( m => m.AdsPageModule)
          },
          {
            path: 'user-gallery/:id',
            loadChildren: () => import('../user-gallery/user-gallery.module').then( m => m.UserGalleryPageModule)
          },
        {
                path: 'ads-detail/:id',
                loadChildren: () => import('../ads-detail/ads-detail.module').then( m => m.AdsDetailPageModule)
        }, 
        {
          path: 'make-appointment/:id',
          loadChildren: () => import('../make-appointment/make-appointment.module').then( m => m.MakeAppointmentPageModule)
        },       
        ]},
        {
          path: 'user-search',
          loadChildren: () => import('../user-search/user-search.module').then( m => m.UserSearchPageModule)
        },
        {
          path: 'user-inbox', children : [{
            path : '',loadChildren: () => import('../user-inbox/user-inbox.module').then( m => m.UserInboxPageModule) 
          },
          {
              path: 'chat-view/:id',
              loadChildren: () => import('../chat-view/chat-view.module').then( m => m.ChatViewPageModule)
          }
        ]
          
        },
        {
          path: 'user-profile', children : [
            {
              path : '',loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
            },
            {
              path: 'edit-user-profile',
              loadChildren: () => import('../edit-user-profile/edit-user-profile.module').then( m => m.EditUserProfilePageModule)
            },
            {
              path: 'about-us',
              loadChildren: () => import('../about-us/about-us.module').then( m => m.AboutUsPageModule)
            },
            {
              path: 'contact-us',
              loadChildren: () => import('../contact-us/contact-us.module').then( m => m.ContactUsPageModule)
            },
            {
              path: 'user-appointment',
              loadChildren: () => import('../user-appointment/user-appointment.module').then( m => m.UserAppointmentPageModule)
            }
          ]
          
        },

        {
          path : '',
          redirectTo:'tabs/user-home',
          pathMatch: 'full'
        },

    ]
  },
  {
    path : '',
    redirectTo:'tabs/user-home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTabsPageRoutingModule {}
