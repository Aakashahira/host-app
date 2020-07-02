import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInboxPageRoutingModule } from './user-inbox-routing.module';

import { UserInboxPage } from './user-inbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserInboxPageRoutingModule,
  
  ],
  declarations: [UserInboxPage]
})
export class UserInboxPageModule {}
