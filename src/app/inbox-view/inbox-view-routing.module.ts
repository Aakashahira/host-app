import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxViewPage } from './inbox-view.page';

const routes: Routes = [
  {
    path: '',
    component: InboxViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxViewPageRoutingModule {}
