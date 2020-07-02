import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAdDetailsPageRoutingModule } from './my-ad-details-routing.module';

import { MyAdDetailsPage } from './my-ad-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAdDetailsPageRoutingModule
  ],
  declarations: [MyAdDetailsPage]
})
export class MyAdDetailsPageModule {}
