import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserGalleryPageRoutingModule } from './user-gallery-routing.module';

import { UserGalleryPage } from './user-gallery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserGalleryPageRoutingModule
  ],
  declarations: [UserGalleryPage]
})
export class UserGalleryPageModule {}
