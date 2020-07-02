import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WhoAreYouPage } from './who-are-you.page';

const routes: Routes = [
  {
    path: '',
    component: WhoAreYouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WhoAreYouPageRoutingModule {}
