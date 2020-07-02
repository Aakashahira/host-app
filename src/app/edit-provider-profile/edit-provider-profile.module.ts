import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProviderProfilePageRoutingModule } from './edit-provider-profile-routing.module';

import { EditProviderProfilePage } from './edit-provider-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProviderProfilePageRoutingModule
  ],
  declarations: [EditProviderProfilePage]
})
export class EditProviderProfilePageModule {}
