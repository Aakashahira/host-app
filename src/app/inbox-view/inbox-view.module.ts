import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxViewPageRoutingModule } from './inbox-view-routing.module';

import { InboxViewPage } from './inbox-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxViewPageRoutingModule
  ],
  declarations: [InboxViewPage]
})
export class InboxViewPageModule {}
