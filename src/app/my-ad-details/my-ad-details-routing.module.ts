import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAdDetailsPage } from './my-ad-details.page';

const routes: Routes = [
  {
    path: '',
    component: MyAdDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAdDetailsPageRoutingModule {}
