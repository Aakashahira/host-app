import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserAppointmentPageRoutingModule } from './user-appointment-routing.module';

import { UserAppointmentPage } from './user-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAppointmentPageRoutingModule
  ],
  declarations: [UserAppointmentPage]
})
export class UserAppointmentPageModule {}
