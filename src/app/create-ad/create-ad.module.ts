import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAdPageRoutingModule } from './create-ad-routing.module';
import { CreateAdPage } from './create-ad.page';
import {MatStepperModule} from '@angular/material/stepper';
import { IonicStepperModule } from 'ionic-stepper';
import {MatButtonModule} from '@angular/material/button';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAdPageRoutingModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,

  ],
  declarations: [CreateAdPage]
})
export class CreateAdPageModule {}
