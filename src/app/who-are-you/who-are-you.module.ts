import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WhoAreYouPageRoutingModule } from './who-are-you-routing.module';

import { WhoAreYouPage } from './who-are-you.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WhoAreYouPageRoutingModule
  ],
  declarations: [WhoAreYouPage]
})
export class WhoAreYouPageModule {}
