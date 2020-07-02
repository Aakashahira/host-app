import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAppointmentPage } from './user-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: UserAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAppointmentPageRoutingModule {}
