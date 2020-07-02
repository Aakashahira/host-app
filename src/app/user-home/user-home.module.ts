import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserHomePageRoutingModule } from './user-home-routing.module';
import { UserHomePage } from './user-home.page';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,
    UserHomePageRoutingModule
  ],
  declarations: [UserHomePage]
})
export class UserHomePageModule {}
