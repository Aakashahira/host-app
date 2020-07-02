import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserLoginPageRoutingModule } from './user-login-routing.module';

import { UserLoginPage } from './user-login.page';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserLoginPageRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [UserLoginPage]
})
export class UserLoginPageModule {}
