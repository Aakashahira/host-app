import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsDetailPageRoutingModule } from './ads-detail-routing.module';

import { AdsDetailPage } from './ads-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsDetailPageRoutingModule
  ],
  declarations: [AdsDetailPage]
})
export class AdsDetailPageModule {}
