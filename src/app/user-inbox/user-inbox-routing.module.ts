import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInboxPage } from './user-inbox.page';

const routes: Routes = [
  {
    path: '',
    component: UserInboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInboxPageRoutingModule {}
