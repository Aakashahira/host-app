import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DashboardPage,
    children : [
        { 
          path: 'home', children : [
            {
              path : '',loadChildren: () => import('../home/home.module').then( m => m.HomePageModule) 
            },
            {
              path: 'create-ad',
              loadChildren: () => import('../create-ad/create-ad.module').then( m => m.CreateAdPageModule)
            },
            {
              path: 'gallery',
              loadChildren: () => import('../gallery/gallery.module').then( m => m.GalleryPageModule)
            },
            {
              path: 'my-ads',
              loadChildren: () => import('../my-ads/my-ads.module').then( m => m.MyAdsPageModule)
            },
            {
              path: 'my-ad-details/:id',
              loadChildren: () => import('../my-ad-details/my-ad-details.module').then( m => m.MyAdDetailsPageModule)
            },
            {
                path: 'customers',
                loadChildren: () => import('../customers/customers.module').then( m => m.CustomersPageModule)
            }
          ]
          
        },
        {
          path: 'inbox', children : [
            {
              path: '', loadChildren: () => import('../inbox/inbox.module').then( m => m.InboxPageModule)
            },
            {
              path: 'inbox-view/:id',
              loadChildren: () => import('../inbox-view/inbox-view.module').then( m => m.InboxViewPageModule)
            },
          ] 
        },
        {
          path: 'search',
          loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
        },
        {
          path: 'profile', children : [
            {
              path : '',loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
            },
              {
                path: 'edit-provider-profile',
                loadChildren: () => import('../edit-provider-profile/edit-provider-profile.module').then( m => m.EditProviderProfilePageModule)
              },
              {
                path: 'appointment',
                loadChildren: () => import('../appointment/appointment.module').then( m => m.AppointmentPageModule)
              },
          ]
        },
        {
          path: 'contacts',
          loadChildren: () => import('../contacts/contacts.module').then( m => m.ContactsPageModule)
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
          path : '',
          redirectTo:'tabs/home',
          pathMatch: 'full'
        }
    ]
  },
  {
    path : '',
    redirectTo:'tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
